import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CompleteOnboardingDto {
  @IsInt()
  @Min(18)
  @Max(100)
  age: number;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  gender?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  location?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(8)
  @IsUUID('4', { each: true })
  interestIds: string[];
}
