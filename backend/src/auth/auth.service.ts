import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
// import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class AuthService {

    constructor(private readonly prisma:PrismaService){}


    async register(registerDto:RegisterDto){

        const existingUser = await this.prisma.user.findUnique({
            where:{
                email:registerDto.email
            }
        });

        if(existingUser){
            throw new ConflictException("User already exists in db!!!")
        }

        const hashPassword = await bcrypt.hash(registerDto.password,10);

        // Create a user

        const user = await this.prisma.user.create({

            data:{
                name:registerDto.name,
                email:registerDto.email,
                password:hashPassword,
            }

        })

        // remove password from response

        const {password,...userWithoutPassword} =user

        return{
            message:"User Register Successfully!!",
            user:userWithoutPassword
        }
       
    }
}
