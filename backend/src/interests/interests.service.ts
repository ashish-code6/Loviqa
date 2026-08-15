import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InterestsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllInterests() {
    return this.prisma.interest.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }
}