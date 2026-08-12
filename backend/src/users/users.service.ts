import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateInterestDto } from './dto/create-interest.dto';


@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async createProfile(
        userId: string,
        createProfileDto: CreateProfileDto,
    ) {
        const profile = await this.prisma.userProfile.create({
            data: {
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

    async createInterest(createInterestDto: CreateInterestDto) {
  const interest = await this.prisma.interest.create({
    data: {
      name: createInterestDto.name,
    },
  });

  return {
    message: 'Interest created successfully',
    interest,
  };
}

}

