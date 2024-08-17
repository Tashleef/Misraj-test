import * as joi from 'joi';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { passportStrategy } from 'package/strategies/constant';
import { validationSchema } from 'package/validation';
import { AuthError } from '../service/auth-error.service';
import { AuthApiService } from '../service/auth-api.service';
import { buildJWTPayload } from 'package/strategies/jwt/jwt-payload';
import { errorCode } from 'package/utils/Error/error-codes';
import { JoiValidationPipe } from 'package/validation/joi.pips';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  passportStrategy.local,
) {
  constructor(
    private authError: AuthError,
    private localSignInService: AuthApiService,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const validateSchema = joi
      .object({
        username: joi.string().min(4).required(),
        password: joi.string().min(4).required(),
      })
      .required();
    new JoiValidationPipe(validateSchema).transform({
      username,
      password,
    });
    // if (error)
    //   throw new HttpException(
    //     {
    //       code: errorCode.loginFailed,
    //       message: error?.details.flatMap((val) => {
    //         return {
    //           message: val.message.split('"').join(''),
    //           path: val.context.label,
    //         };
    //       }),
    //     },
    //     HttpStatus.BAD_REQUEST,
    //   );
    const account = await this.localSignInService.validateAccount(
      username,
      password,
    );

    return account;
  }
}
