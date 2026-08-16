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
        return this.dailyEmojiService.createEmoji(
            req.user.id,
            body.emoji,
        );
    }

    @Get('of-the-day')
    async getEmojiOfTheDay() {
        return this.dailyEmojiService.getEmojiOfTheDay();
    }
}