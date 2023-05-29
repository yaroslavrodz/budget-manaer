import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '@auth/auth.module';
import { OperationsModule } from '@operations/operations.module';
import { Saving } from '@savings/saving.model';
import { SavingsService } from '@savings/services/savings.service';
import { OperationSavingService } from '@savings/services/operation-saving.service';
import { SavingsController } from '@savings/savings.controller';

@Module({
  providers: [SavingsService, OperationSavingService],
  controllers: [SavingsController],
  imports: [
    SequelizeModule.forFeature([Saving]),
    AuthModule,
    forwardRef(() => OperationsModule),
  ],
  exports: [OperationSavingService],
})
export class SavingsModule {}
