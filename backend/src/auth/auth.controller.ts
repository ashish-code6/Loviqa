import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthenticatedRequest } from './types/authenticated-request';

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

    @Get('profile')
    profile(@Req() req: AuthenticatedRequest){
        return this.authService.getProfile(req.user.id)
    }

}
