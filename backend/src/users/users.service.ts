import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CompleteOnboardingDto } from './dto/complete-onboarding.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import type { ProfileImageFile } from './types/profile-image-file';


@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly cloudinaryService: CloudinaryService,
    ) { }

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

    async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
        const { interestIds, customInterest, ...profileData } = updateProfileDto;
        const isUpdatingInterests = interestIds !== undefined || customInterest !== undefined;
        const cleanedCustomInterest = customInterest?.trim();
        let savedInterestIds = interestIds ?? [];
        let otherInterestId: string | undefined;

        if (isUpdatingInterests && cleanedCustomInterest) {
            const otherInterest = await this.prisma.interest.upsert({
                where: { name: 'Other' },
                update: {},
                create: { name: 'Other' },
                select: { id: true },
            });
            otherInterestId = otherInterest.id;
            savedInterestIds = [...savedInterestIds, otherInterest.id];
        }

        if (isUpdatingInterests) {
            if (!savedInterestIds.length || savedInterestIds.length > 8) {
                throw new BadRequestException('Choose between 1 and 8 interests');
            }
            const interests = await this.prisma.interest.findMany({
                where: { id: { in: savedInterestIds } },
                select: { id: true },
            });

            if (interests.length !== savedInterestIds.length) {
                throw new BadRequestException('One or more selected interests are no longer available');
            }
        }

        const profile = await this.prisma.$transaction(async (tx) => {
            const savedProfile = await tx.userProfile.upsert({
                where: { userId },
                update: profileData,
                create: { userId, ...profileData },
            });

            if (isUpdatingInterests) {
                await tx.userInterest.deleteMany({ where: { userId } });
                await tx.userInterest.createMany({
                    data: savedInterestIds.map((interestId) => ({
                        userId,
                        interestId,
                        customInterest: interestId === otherInterestId ? cleanedCustomInterest : null,
                    })),
                });
            }

            return savedProfile;
        });

        return { message: 'Profile updated successfully', profile };
    }

    async updateProfileImage(userId: string, file: ProfileImageFile) {
        const upload = await this.cloudinaryService.uploadProfileImage(file);
        const profile = await this.prisma.userProfile.upsert({
            where: { userId },
            update: { profileImage: upload.secure_url },
            create: { userId, profileImage: upload.secure_url },
        });

        return {
            message: 'Profile picture updated successfully',
            profile,
        };
    }

    async removeProfileImage(userId: string) {
        const profile = await this.prisma.userProfile.update({
            where: { userId },
            data: { profileImage: null },
        });

        return { message: 'Profile picture removed successfully', profile };
    }

}

