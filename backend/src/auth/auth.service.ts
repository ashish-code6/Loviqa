import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailService } from '../mail/mail.service';


@Injectable()
export class AuthService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly mailService: MailService,
    ) { }



    async register(registerDto: RegisterDto) {

        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: registerDto.email
            }
        });

        if (existingUser) {
            throw new ConflictException("User already exists in db!!!")
        }

        const hashPassword = await bcrypt.hash(registerDto.password, 10);

        const user = await this.prisma.user.create({

            data: {
                name: registerDto.name,
                email: registerDto.email,
                password: hashPassword,
            }

        })

        const { password, ...userWithoutPassword } = user

        return {
            success: true,
            message: "User Register Successfully!!",
            user: userWithoutPassword
        }

    }

    async login(loginDto: LoginDto) {
  const user = await this.prisma.user.findUnique({
    where: {
      email: loginDto.email,
    },
    include: { profile: true },
  });

  if (!user) {
    throw new UnauthorizedException('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(
    loginDto.password,
    user.password,
  );

  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid email or password');
  }

  const payload = {
    sub: user.id,
    email: user.email,
  };

  const accessToken = await this.jwtService.signAsync(payload);

  return {
    message: 'Login successful',
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    onboardingComplete: Boolean(user.profile),
  };
}

async forgotPassword(email: string) {
  const genericResponse = {
    message: 'If an account exists for that email, a reset link has been sent.',
  };

  const user = await this.prisma.user.findUnique({ where: { email } });
  if (!user) return genericResponse;

  const resetToken = await this.jwtService.signAsync(
    { sub: user.id, type: 'password-reset' },
    { expiresIn: 60 * 15 },
  );
  const frontendUrl = this.configService.get<string>('FRONTEND_URL') ?? 'http://localhost:3000';
  const resetUrl = `${frontendUrl}/reset-password?token=${encodeURIComponent(resetToken)}`;

  await this.mailService.sendPasswordResetEmail(user.email, resetUrl);

  return genericResponse;
}

async resetPassword({ token, password }: ResetPasswordDto) {
  try {
    const payload = await this.jwtService.verifyAsync<{ sub: string; type: string }>(token);
    if (payload.type !== 'password-reset') throw new UnauthorizedException('Invalid reset link');

    const hashPassword = await bcrypt.hash(password, 10);
    await this.prisma.user.update({
      where: { id: payload.sub },
      data: { password: hashPassword },
    });
  } catch (error) {
    if (error instanceof UnauthorizedException) throw error;
    throw new UnauthorizedException('This reset link is invalid or has expired');
  }

  return { message: 'Password reset successfully. You can now log in.' };
}

async getProfile(userId: string) {
  const user = await this.prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      profile: true,
      interests: { include: { interest: true } },
    },
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  const { password, ...userWithoutPassword } = user;

  return {
    success: true,
    message: 'Profile fetched successfully',
    user: userWithoutPassword,
    onboardingComplete: Boolean(user.profile),
  };
}

}
