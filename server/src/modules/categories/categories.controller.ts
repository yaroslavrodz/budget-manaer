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
import { CategoriesService } from '@categories/categories.service';
import {
  FindCategoriesDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@categories/dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAll(@AuthUser() user: User, @Query() dto: FindCategoriesDto) {
    return this.categoriesService.findAll(user.id, dto);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@AuthUser() user: User, @Body() dto: CreateCategoryDto) {
    return this.categoriesService.create({ ...dto, userId: user.id });
  }

  @UseGuards(AuthGuard)
  @Put()
  update(@Body() dto: UpdateCategoryDto) {
    return this.categoriesService.update(dto);
  }

  @UseGuards(AuthGuard)
  @Delete()
  delete(@Query('id') id: number) {
    return this.categoriesService.delete(id);
  }
}
