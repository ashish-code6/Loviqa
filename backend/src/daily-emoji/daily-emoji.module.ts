import { Module } from '@nestjs/common';
import { DailyEmojiService } from './daily-emoji.service';
import { DailyEmojiController } from './daily-emoji.controller';

@Module({
  providers: [DailyEmojiService],
  controllers: [DailyEmojiController]
})
export class DailyEmojiModule {}
