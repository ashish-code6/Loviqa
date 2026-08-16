import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports:[PrismaModule,AiModule],
  providers: [MatchService],
  controllers: [MatchController]
})
export class MatchModule {}
