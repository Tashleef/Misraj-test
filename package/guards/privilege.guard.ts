import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { IUser } from 'package/strategies/jwt/jwt-payload';

@Injectable()
export class PrivilegeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const privileges = this.reflector.get<string[]>(
      'privilege',
      context.getHandler(),
    );

    if (!privileges || privileges.length === 0) {
      return true;
    }
    const { user }: { user: IUser } = context.switchToHttp().getRequest();
    if (!user) return false;
    let canAccess = true;
    if (!canAccess) {
      throw new HttpException(
        { message: 'Forbidden', code: 1001 },
        HttpStatus.FORBIDDEN,
      );
    }
    return canAccess;
  }
}
