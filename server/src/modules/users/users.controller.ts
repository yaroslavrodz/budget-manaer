import { Body, Controller, UseGuards, Put } from '@nestjs/common';

import { AuthGuard } from '@auth/auth.guard';
import { AuthUser } from '@core/decorators/auth-user.decorator';
import { User } from '@users/user.model';
import { UsersService } from '@users/users.service';
import { CreateUserDto, UpdatePasswordDto } from '@users/dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Put()
  update(@AuthUser() user: User, @Body() dto: Omit<CreateUserDto, 'password'>) {
    return this.usersService.update(user.id, dto);
  }

  @UseGuards(AuthGuard)
  @Put('/password')
  updatePassword(@AuthUser() user: User, @Body() dto: UpdatePasswordDto) {
    return this.usersService.updatePassword(user.id, dto);
  }
}
