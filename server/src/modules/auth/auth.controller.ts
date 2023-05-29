import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from '@auth/auth.service';
import { LoginDto } from '@auth/dto';
import { CreateUserDto } from '@users/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('/register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
