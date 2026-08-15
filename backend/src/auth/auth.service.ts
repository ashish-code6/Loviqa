import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
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

        // Create a user

        const user = await this.prisma.user.create({

            data: {
                name: registerDto.name,
                email: registerDto.email,
                password: hashPassword,
            }

        })

        // remove password from response

        const { password, ...userWithoutPassword } = user

        return {
            message: "User Register Successfully!!",
            user: userWithoutPassword
        }

    }

    // login

    async login(loginDto: LoginDto) {
  // Find user by email
  const user = await this.prisma.user.findUnique({
    where: {
      email: loginDto.email,
    },
    include: { profile: true },
  });

  // Check user exists
  if (!user) {
    throw new UnauthorizedException('Invalid email or password');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(
    loginDto.password,
    user.password,
  );

  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid email or password');
  }

  // JWT Payload
  const payload = {
    sub: user.id,
    email: user.email,
  };

  // Generate Access Token
  const accessToken = await this.jwtService.signAsync(payload);

  // Response
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
    message: 'Profile fetched successfully',
    user: userWithoutPassword,
    onboardingComplete: Boolean(user.profile),
  };
}

}
