import { Body, Controller, Get, Post, Req } from '@nestjs/common';
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
    login(@Body() loginDto:LoginDto){
        return this.authService.login(loginDto)
    }

    @Post('forgot-password')
    forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto.email);
    }

    @Post('reset-password')
    resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }

    @Get('profile')
    profile(@Req() req: AuthenticatedRequest){
        return this.authService.getProfile(req.user.id)
    }

}
