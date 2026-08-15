import {
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateInterestDto{
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  interestIds: string[];

  customInterest?: string;
}