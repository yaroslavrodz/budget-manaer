import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@users/users.service';
import { LoginDto } from '@auth/dto';
import { CreateUserDto } from '@users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(dto: LoginDto) {
    const { username, password } = dto;

    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const confirmed = await bcrypt.compare(password, user.password);
    if (!confirmed) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const userPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    const token = this.jwtService.sign(userPayload);
    return {
      user: userPayload,
      token,
    };
  }

  async register(dto: CreateUserDto) {
    const { email, username, password } = dto;

    let candidate = await this.usersService.findByUsername(email);
    if (candidate) {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);
    }

    candidate = await this.usersService.findByUsername(username);
    if (candidate) {
      throw new HttpException('Username already in use', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    const user = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });

    const userPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    const token = this.jwtService.sign(userPayload);
    return {
      user: userPayload,
      token,
    };
  }
}
