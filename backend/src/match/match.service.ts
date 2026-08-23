import { Injectable } from '@nestjs/common';
import { AiService } from 'src/ai/ai.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MatchService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly aiService: AiService,
    ) { }

    async getMatches(userId: string) {

        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                profile: true,
                interests: { include: { interest: true } },
            },
        });

        if (!user) {
            return [];
        }

        const age = user.profile?.age;

        if (age === null || age === undefined) {
            return [];
        }

        const minAge = age - 5;
        const maxAge = age + 5;

        const userInterests = user.interests.map(item => item.customInterest || item.interest.name);

        const userAiProfile = {
            age: user.profile?.age ?? null,
            gender: user.profile?.gender ?? null,
            bio: user.profile?.bio ?? null,
            location: user.profile?.location ?? null,
            interests: userInterests,
        };

        const userProfileText = this.aiService.createProfileText(userAiProfile);

        const matches = await this.prisma.user.findMany({
            where: {
                id: { not: userId },
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
                interests: { include: { interest: true } },
            },
        });

        // Manual matching
        const manualMatches = matches.map(match => {

            const matchInterests = match.interests.map(item => item.customInterest || item.interest.name);

            const commonInterests = userInterests.filter(
                item => matchInterests.includes(item)
            );

            const interestScore = userInterests.length > 0
                ? (commonInterests.length / userInterests.length) * 100
                : 0;

            return {
                match,
                matchInterests,
                commonInterests,
                interestScore,
            };
        });

        // Sort by manual interest score
        manualMatches.sort((a, b) => b.interestScore - a.interestScore);

        // Only top 10 candidates go to AI
        const topCandidates = manualMatches.slice(0, 10);

        // AI matching
        const result = await Promise.all(
            topCandidates.map(async candidate => {

                const {
                    match,
                    matchInterests,
                    commonInterests,
                    interestScore,
                } = candidate;

                const aiProfile = {
                    age: match.profile?.age ?? null,
                    gender: match.profile?.gender ?? null,
                    bio: match.profile?.bio ?? null,
                    location: match.profile?.location ?? null,
                    interests: matchInterests,
                };

                const profileText = this.aiService.createProfileText(aiProfile);

                let aiResult;
                let aiScore;

                try {
                    aiResult = await this.aiService.compareProfiles(
                        userProfileText,
                        profileText,
                    );

                    aiScore = Math.min(100, Math.max(0, Number(aiResult.score) || 0));

                } catch (error) {
                    console.error('AI matching failed:', error);

                    // AI failed → manual score fallback
                    aiScore = interestScore;

                    aiResult = {
                        score: interestScore,
                        reasons: ['AI unavailable, using interest matching'],
                        strengths: [],
                        concerns: [],
                    };
                }

                const finalScore = Math.round((interestScore * 0.4) + (aiScore * 0.6));
                await this.prisma.matchScore.upsert({
                    where: {
                        userId_candidateId: {
                            userId,
                            candidateId: match.id,
                        },
                    },
                    update: {
                        interestScore: Math.round(interestScore),
                        aiScore,
                        finalScore,
                    },
                    create: {
                        userId,
                        candidateId: match.id,
                        interestScore: Math.round(interestScore),
                        aiScore,
                        finalScore,
                    },
                });

                // Minimum match score
                if (finalScore < 45) {
                    return null;
                }

                return {
                    ...match,
                    commonInterests,
                    interestScore,
                    aiResult,
                    finalScore,
                };
            })
        );

        // Remove low-score matches
        const filteredResult = result.filter(match => match !== null);

        // Sort by final score
        filteredResult.sort((a, b) => b.finalScore - a.finalScore);

        return filteredResult;
    }
}
