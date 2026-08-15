import type { Request } from 'express';
import {
    Controller,
    Post,
    Body,
    UseGuards,
    Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from './users.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CompleteOnboardingDto } from './dto/complete-onboarding.dto';

type AuthenticatedRequest = Request & {
    user: {
        id: string;
        email: string;
    };
};

@Controller('users')
export class UsersController {
    constructor(
        private readonly userservice: UsersService,
    ) { }

    @Post('profile')
    @UseGuards(AuthGuard('jwt'))
    createProfile(
        @Req() req: AuthenticatedRequest,
        @Body() createProfileDto: CreateProfileDto,
    ) {
        return this.userservice.createProfile(
            req.user.id,
            createProfileDto,
        );
    }

    @Post('onboarding')
    @UseGuards(AuthGuard('jwt'))
    completeOnboarding(
        @Req() req: AuthenticatedRequest,
        @Body() onboardingDto: CompleteOnboardingDto,
    ) {
        return this.userservice.completeOnboarding(req.user.id, onboardingDto);
    }

}
