import type { Request } from 'express';
import {
    Controller,
    Post,
    Delete,
    Patch,
    Body,
    UseGuards,
    Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, UploadedFile } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CompleteOnboardingDto } from './dto/complete-onboarding.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import type { ProfileImageFile } from './types/profile-image-file';

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

    @Patch('profile')
    @UseGuards(AuthGuard('jwt'))
    updateProfile(
        @Req() req: AuthenticatedRequest,
        @Body() updateProfileDto: UpdateProfileDto,
    ) {
        return this.userservice.updateProfile(req.user.id, updateProfileDto);
    }

    @Post('profile/image')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('image', {
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (_req, file, callback) => {
            callback(null, /^image\/(jpeg|png|webp)$/.test(file.mimetype));
        },
    }))
    updateProfileImage(
        @Req() req: AuthenticatedRequest,
        @UploadedFile() file: ProfileImageFile,
    ) {
        return this.userservice.updateProfileImage(req.user.id, file);
    }

    @Delete('profile/image')
    @UseGuards(AuthGuard('jwt'))
    removeProfileImage(@Req() req: AuthenticatedRequest) {
        return this.userservice.removeProfileImage(req.user.id);
    }

}
