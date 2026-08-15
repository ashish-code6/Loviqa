import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CompleteOnboardingDto } from './dto/complete-onboarding.dto';


@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async createProfile(
        userId: string,
        createProfileDto: CreateProfileDto,
    ) {
        const profile = await this.prisma.userProfile.upsert({
            where: { userId },
            update: {
                age: createProfileDto.age,
                gender: createProfileDto.gender,
                bio: createProfileDto.bio,
                location: createProfileDto.location,
            },
            create: {
                userId,
                age: createProfileDto.age,
                gender: createProfileDto.gender,
                bio:    createProfileDto.bio,
                location: createProfileDto.location,
            },
        });

        return {
            message: 'User profile created successfully',
            profile,
        };
    }

    async completeOnboarding(userId: string, onboardingDto: CompleteOnboardingDto) {
        const interests = await this.prisma.interest.findMany({
            where: { id: { in: onboardingDto.interestIds } },
            select: { id: true },
        });

        if (interests.length !== onboardingDto.interestIds.length) {
            throw new BadRequestException('One or more selected interests are no longer available');
        }

        const profile = await this.prisma.$transaction(async (tx) => {
            const savedProfile = await tx.userProfile.upsert({
                where: { userId },
                update: {
                    age: onboardingDto.age,
                    gender: onboardingDto.gender,
                    location: onboardingDto.location,
                    bio: onboardingDto.bio,
                },
                create: {
                    userId,
                    age: onboardingDto.age,
                    gender: onboardingDto.gender,
                    location: onboardingDto.location,
                    bio: onboardingDto.bio,
                },
            });

            await tx.userInterest.deleteMany({ where: { userId } });
            await tx.userInterest.createMany({
                data: onboardingDto.interestIds.map((interestId) => ({ userId, interestId })),
            });

            return savedProfile;
        });

        return {
            message: 'Onboarding completed successfully',
            profile,
            onboardingComplete: true,
        };
    }

}

