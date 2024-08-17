import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthError } from 'src/auth/service/auth-error.service';
import { passportStrategy } from './constant';
import { buildJWTPayload } from './jwt/jwt-payload';
import { AuthApiService } from 'src/auth/service/auth-api.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  passportStrategy.local,
) {
  constructor(
    private readonly authApiService: AuthApiService,
    private readonly authError: AuthError,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authApiService.validateAccount(username, password);
    if (!user) {
      throw new HttpException(
        this.authError.wrongCredentials(),
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
