import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class signinDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
