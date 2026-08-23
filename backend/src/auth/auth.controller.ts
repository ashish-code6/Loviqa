import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import  { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import  { LoginDto } from './dto/login.dto';
import type { AuthenticatedRequest } from './types/authenticated-request';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('register')
    register(@Body() registerDto : RegisterDto){
        return this.authService.register(registerDto);
    }

    @Post('login')
    async login(@Body() loginDto:LoginDto, @Res({ passthrough: true }) response: Response){
        const payload = await this.authService.login(loginDto);
        response.cookie('loviqa_token', payload.accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return { success: true, ...payload };
    }

    @Post('forgot-password')
    forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto.email);
    }

    @Post('reset-password')
    resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }

    @Post('logout')
    @UseGuards(AuthGuard('jwt'))
    logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('loviqa_token', {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        });
        return { success: true, message: 'Logout successful' };
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    profile(@Req() req: AuthenticatedRequest){
        return this.authService.getProfile(req.user.id)
    }

}
