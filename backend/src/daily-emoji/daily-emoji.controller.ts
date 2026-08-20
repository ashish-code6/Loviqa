import type { Request } from 'express';
import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DailyEmojiService } from './daily-emoji.service';

type AuthenticatedRequest = Request & {
    user: {
        id: string;
        email: string;
    };
};

@Controller('daily-emoji')
export class DailyEmojiController {

    constructor(
        private readonly dailyEmojiService: DailyEmojiService,
    ) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createEmoji(
        @Req() req: AuthenticatedRequest,
        @Body() body: { emoji: string },
    ) {
        const emoji = await this.dailyEmojiService.createEmoji(
            req.user.id,
            body.emoji,
        );
        return { success: true, message: 'Daily emoji saved successfully', data: emoji };
    }

    @Get('of-the-day')
    async getEmojiOfTheDay() {
        const emoji = await this.dailyEmojiService.getEmojiOfTheDay();
        return { success: true, message: 'Emoji of the day fetched successfully', data: emoji };
    }

    @Get('mine')
    @UseGuards(AuthGuard('jwt'))
    async getMyEmoji(@Req() req: AuthenticatedRequest) {
        const emoji = await this.dailyEmojiService.getUserEmojiForToday(req.user.id);
        return { success: true, message: 'Your daily emoji fetched successfully', data: emoji };
    }
}
