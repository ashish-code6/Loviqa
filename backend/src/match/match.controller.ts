import type { Request } from 'express';
import {
    Controller,
    Get,
    UseGuards,
    Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MatchService } from './match.service';



type AuthenticatedRequest = Request & {
    user: {
        id: string;
        email: string;
    };
};

@Controller('matches')
export class MatchController {

    constructor(
        private readonly matchService: MatchService,
    ) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    getMatches(
        @Req() req: AuthenticatedRequest,
    ) {
        return this.matchService.getMatches(req.user.id);
    }
}