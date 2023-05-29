import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new HttpException('Unathorized', HttpStatus.UNAUTHORIZED);
      }

      req.user = this.jwtService.verify(token);
      return true;
    } catch (error) {
      throw new HttpException('Unathorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
