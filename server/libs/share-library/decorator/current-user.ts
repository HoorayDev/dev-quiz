import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

/**
 * UseGuards(JwtGuard)를 사용하면 request.user 에 user 정보가 담겨있다.
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    try {
      if (request.user) {
        return request.user;
      }

      const token = request.cookies[process.env.COOKIE_SECRET];
      if (!token) return null;

      const user = jwt.verify(token, process.env.JWT_SECRET) as {
        id: string;
        name: string;
      };
      return {
        id: user.id,
        name: user.name,
      };
    } catch (e) {
      return null;
    }
  },
);
