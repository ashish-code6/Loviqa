import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowService {

    constructor(private readonly prisma: PrismaService) { }
z
    async follow(followerId: string, followingId: string) {
        if (followerId === followingId) {
            throw new BadRequestException('You cannot follow yourself');
        }

        const existingFollow = await this.prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId,
                },
            },
        });

        if (existingFollow) {
            throw new BadRequestException('Already following this user');
        }

        return this.prisma.follow.create({
            data: {
                followerId,
                followingId,
            },
        });
    }
}
