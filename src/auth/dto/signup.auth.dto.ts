import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class signupDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @MaxLength(255)
  password: string;

  @IsNotEmpty()
  @IsInt()
  @Min(18)
  @Max(130)
  age: number;
}
