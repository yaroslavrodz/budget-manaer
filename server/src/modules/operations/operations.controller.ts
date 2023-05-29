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
import { OperationsService } from '@operations/operations.service';
import {
  FindOperationsDto,
  CreateOperationDto,
  UpdateOperationDto,
} from '@operations/dto';

@Controller('operations')
export class OperationsController {
  constructor(private operationsService: OperationsService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAll(@AuthUser() user: User, @Query() dto: FindOperationsDto) {
    return this.operationsService.findAll(user.id, dto);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@AuthUser() user: User, @Body() dto: CreateOperationDto) {
    return this.operationsService.create({ ...dto, userId: user.id });
  }

  @UseGuards(AuthGuard)
  @Put()
  update(@Body() dto: UpdateOperationDto) {
    return this.operationsService.update(dto);
  }

  @UseGuards(AuthGuard)
  @Delete()
  delete(@Query('id') id: number) {
    return this.operationsService.delete(id);
  }
}
