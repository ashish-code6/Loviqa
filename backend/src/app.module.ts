import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { InterestsModule } from './interests/interests.module';
import { MatchModule } from './match/match.module';
import { AiModule } from './ai/ai.module';
import { DailyEmojiModule } from './daily-emoji/daily-emoji.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    InterestsModule,
    MatchModule,
    AiModule,
    DailyEmojiModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
