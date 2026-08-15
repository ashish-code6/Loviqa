import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InterestsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllInterests() {
    const defaults = [
      'Music', 'Movies', 'Gaming', 'Travel', 'Books', 'Coding',
      'Photography', 'Fitness', 'Food', 'Art', 'Sports', 'Wellness',
    ];

    await this.prisma.interest.createMany({
      data: defaults.map((name) => ({ name })),
      skipDuplicates: true,
    });

    return this.prisma.interest.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }
}
