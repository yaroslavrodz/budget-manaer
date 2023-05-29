import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '@auth/auth.module';
import { SavingsModule } from '@savings/savings.module';
import { Operation } from '@operations/operation.model';
import { OperationsService } from '@operations/operations.service';
import { OperationsController } from '@operations/operations.controller';

@Module({
  providers: [OperationsService],
  controllers: [OperationsController],
  imports: [
    SequelizeModule.forFeature([Operation]),
    AuthModule,
    forwardRef(() => SavingsModule),
  ],
  exports: [OperationsService],
})
export class OperationsModule {}
