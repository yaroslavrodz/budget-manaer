import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@auth/auth.guard';
import { AuthUser } from '@core/decorators/auth-user.decorator';
import { User } from '@users/user.model';
import { SavingsService } from '@savings/services/savings.service';
import { FindSavingsDto, CreateSavingDto, UpdateSavingDto } from '@savings/dto';

@Controller('savings')
export class SavingsController {
  constructor(private savingsService: SavingsService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAll(@AuthUser() user: User, @Query() dto: FindSavingsDto) {
    return this.savingsService.findAll(user.id, dto);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@AuthUser() user: User, @Body() dto: CreateSavingDto) {
    return this.savingsService.create({ ...dto, userId: user.id });
  }

  @UseGuards(AuthGuard)
  @Put()
  update(@Body() dto: UpdateSavingDto) {
    return this.savingsService.update(dto);
  }

  @UseGuards(AuthGuard)
  @Delete()
  delete(@Query('id') id: number) {
    return this.savingsService.delete(id);
  }

  @UseGuards(AuthGuard)
  @Get('balance')
  getBalance(@AuthUser() user: User) {
    return this.savingsService.getBalance(user.id);
  }
}
