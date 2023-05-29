import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { User } from 'src/modules/users/user.model';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as User;
  },
);
