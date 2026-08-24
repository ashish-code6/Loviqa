import { Injectable } from '@nestjs/common';
import { AiService } from 'src/ai/ai.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MatchService {
    private readonly scoreCacheTtlMs = 24 * 60 * 60 * 1000;
    private readonly inFlightRequests = new Map<string, Promise<unknown>>();

    constructor(
        private readonly prisma: PrismaService,
        private readonly aiService: AiService,
    ) { }

    async getMatches(userId: string) {
        const existingRequest = this.inFlightRequests.get(userId);
        if (existingRequest) {
            return existingRequest;
        }

        const request = this.buildMatches(userId);
        this.inFlightRequests.set(userId, request);

        try {
            return await request;
        } finally {
            this.inFlightRequests.delete(userId);
        }
    }

    private async buildMatches(userId: string) {

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

        // Score only the strongest candidates. Cached scores prevent repeat AI calls.
        const topCandidates = manualMatches.slice(0, 6);
        const cachedScores = await this.prisma.matchScore.findMany({
            where: {
                userId,
                candidateId: { in: topCandidates.map(({ match }) => match.id) },
                updatedAt: { gte: new Date(Date.now() - this.scoreCacheTtlMs) },
            },
        });
        const cachedScoresByCandidateId = new Map(
            cachedScores.map((score) => [score.candidateId, score]),
        );

        // AI matching
        const result = await Promise.all(
            topCandidates.map(async candidate => {

                const {
                    match,
                    matchInterests,
                    commonInterests,
                    interestScore,
                } = candidate;

                const cachedScore = cachedScoresByCandidateId.get(match.id);
                if (cachedScore) {
                    return {
                        ...match,
                        commonInterests,
                        interestScore,
                        aiResult: {
                            score: cachedScore.aiScore,
                            reasons: ['Compatibility score cached within the last 24 hours'],
                            strengths: [],
                            concerns: [],
                        },
                        finalScore: cachedScore.finalScore,
                    };
                }

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

                return {
                    ...match,
                    commonInterests,
                    interestScore,
                    aiResult,
                    finalScore,
                };
            })
        );

        const rankedMatches = result.filter(match => match !== null);

        // Sort by final score
        rankedMatches.sort((a, b) => b.finalScore - a.finalScore);

        return rankedMatches.slice(0, 8).map(({ password, ...safeMatch }) => safeMatch);
    }
}
