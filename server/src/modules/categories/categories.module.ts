import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '@auth/auth.module';
import { OperationsModule } from '@operations/operations.module';
import { Category } from '@categories/category.model';
import { CategoriesService } from '@categories/categories.service';
import { CategoriesController } from '@categories/categories.controller';

@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
  imports: [
    SequelizeModule.forFeature([Category]),
    AuthModule,
    OperationsModule,
  ],
  exports: [CategoriesService],
})
export class CategoriesModule {}
