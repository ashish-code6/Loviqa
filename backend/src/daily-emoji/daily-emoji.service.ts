import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DailyEmojiService {
    constructor(private readonly prisma: PrismaService) { }

    async createEmoji(userId: string, emoji: string) {

        // pick today- date
        const date = new Date().toISOString().split('T')[0];
        //find 

        const existingEmoji = await this.prisma.dailyEmoji.findUnique({
            where: {
                userId_date: {
                    userId,
                    date,
                }
            }
        })

        if (existingEmoji) {
            return existingEmoji;
        }

        const insertEmoji = await this.prisma.dailyEmoji.create({
            data: {
                userId,
                emoji,
                date,
            }

        })
        return insertEmoji;



    }

    async getUserEmojiForToday(userId: string) {
        const date = new Date().toISOString().split('T')[0];

        return this.prisma.dailyEmoji.findUnique({
            where: {
                userId_date: {
                    userId,
                    date,
                },
            },
        });
    }

    // get
   async getEmojiOfTheDay() {

    const date = new Date().toISOString().split('T')[0];

    const emojiCounts = await this.prisma.dailyEmoji.groupBy({
        by: ['emoji'],
        where: { date },
        _count: { emoji: true },
    });

    if (emojiCounts.length === 0) {
        return null;
    }

    const maxCount = Math.max(...emojiCounts.map(item => item._count.emoji));

    const topEmojis = emojiCounts.filter(item => item._count.emoji === maxCount);

    const winner = topEmojis[Math.floor(Math.random() * topEmojis.length)];

    return {
        emoji: winner.emoji,
        count: winner._count.emoji,
    };
}



}
