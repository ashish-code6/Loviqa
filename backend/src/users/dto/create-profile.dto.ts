import { IsInt, IsOptional, IsString, Max, Min } from "class-validator"

export class CreateProfileDto {

    @IsInt()
    @Min(12)
    @Max(100)
    age: number;

    @IsOptional()
    @IsString()
    gender?: string;

    @IsString()
    @IsOptional()
    bio?: string;

    @IsString()
    @IsOptional()
    location?: string;

}