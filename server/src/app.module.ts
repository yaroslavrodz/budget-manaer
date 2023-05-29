import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersModule } from '@users/users.module';
import { AuthModule } from '@auth/auth.module';
import { OperationsModule } from '@operations/operations.module';
import { SavingsModule } from '@savings/savings.module';
import { CategoriesModule } from '@categories/categories.module';

import { User } from '@users/user.model';
import { Operation } from '@operations/operation.model';
import { Saving } from '@savings/saving.model';
import { Category } from '@categories/category.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASS),
      database: process.env.POSTGRES_NAME,
      models: [User, Operation, Saving, Category],
    }),
    UsersModule,
    AuthModule,
    OperationsModule,
    SavingsModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
