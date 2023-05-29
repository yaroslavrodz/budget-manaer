import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import * as bcrypt from 'bcryptjs';

import { User, UserCreationAttrs } from '@users/user.model';
import { UpdatePasswordDto } from '@users/dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(creationAttrs: UserCreationAttrs) {
    return await this.userRepository.create(creationAttrs);
  }

  async update(id: number, updateAttrs: Omit<UserCreationAttrs, 'password'>) {
    const { email, username } = updateAttrs;

    const user = await this.findById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    let candidate = await this.userRepository.findOne({
      where: {
        id: { [Op.not]: id },
        email,
      },
    });
    if (candidate) {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);
    }

    candidate = await this.userRepository.findOne({
      where: {
        id: { [Op.not]: id },
        username,
      },
    });
    if (candidate) {
      throw new HttpException('Username already in use', HttpStatus.CONFLICT);
    }

    user.set(updateAttrs);
    await user.save();
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }

  async updatePassword(id: number, dto: UpdatePasswordDto) {
    const { currentPassword, newPassword } = dto;

    const user = await this.userRepository.scope('login').findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const confirmed = bcrypt.compareSync(currentPassword, user.password);
    if (!confirmed) {
      throw new HttpException(
        'Invalid password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (currentPassword === newPassword) {
      throw new HttpException(
        "New password can't be equal to old",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    user.password = await bcrypt.hash(newPassword, 7);
    await user.save();
    return true;
  }

  async findById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return await this.userRepository.scope('login').findOne({
      where: { email },
    });
  }

  async findByUsername(username: string) {
    return await this.userRepository.scope('login').findOne({
      where: { username },
    });
  }
}
