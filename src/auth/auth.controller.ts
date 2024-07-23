import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signinDto, signupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  insertUser(@Body() dto: signupDto) {
    return this.authService.insertUser(dto);
  }
  @HttpCode(200)
  @Post('/signin')
  signin(@Body() dto: signinDto) {
    return this.authService.signin(dto);
  }
}
