import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '@users/users.module';
import { AuthService } from '@auth/auth.service';
import { AuthController } from '@auth/auth.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET',
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRE_TIME || '15m',
      },
    }),
    forwardRef(() => UsersModule),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
