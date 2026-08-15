import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MatchService {

    constructor(private readonly prisma: PrismaService) { }

    async getMatches(userId: string) {

        // 1. Get current user
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                profile: true,
                interests: {
                    include: {
                        interest: true,
                    },
                },
            },
        });

        // User not found
        if (!user) {
            return [];
        }

        // 2. Get current user's age
        const age = user.profile?.age;

        if (!age) {
            return [];
        }

        // 3. Age range: -5 and +5
        const minAge = age - 5;
        const maxAge = age + 5;

        // 4. Get current user's interests
        const userInterests = user.interests.map(
            (item) => item.interest.name
        );

        // 5. Find potential matches
        const matches = await this.prisma.user.findMany({
            where: {
                id: {
                    not: userId,
                },

                isActive: true,

                profile: {
                    age: {
                        gte: minAge,
                        lte: maxAge,
                    },
                },
            },

            include: {
                profile: true,

                interests: {
                    include: {
                        interest: true,
                    },
                },
            },
        });

        // console.log("USER INTERESTS:", userInterests);
        // 6. Compare interests
        const result = matches.map((match) => {

            const matchInterests = match.interests.map(
                (item) => item.interest.name
            );

            // console.log("MATCH INTERESTS:", matchInterests);

            const commonInterests = userInterests.filter(
                (item) => matchInterests.includes(item)
            );

            const interestScore =
                userInterests.length > 0
                    ? (commonInterests.length / userInterests.length) * 100
                    : 0;

            return {
                ...match,
                commonInterests,
                interestScore
            };
        });
        result.sort((a, b) => b.interestScore - a.interestScore);
        // 7. Return matches
        return result;
    }
}