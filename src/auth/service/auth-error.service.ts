import { Injectable } from '@nestjs/common';
import { Error } from 'package/utils/Error/error';
import { errorCode } from 'package/utils/Error/error-codes';

@Injectable()
export class AuthError {
  loginFailedError: Error = {
    message: 'username or password is wrong',
    code: errorCode.loginFailed,
  };

  userIsRegisteredError: Error = {
    message: 'User is Already registered',
    code: errorCode.userIsRegistered,
  };

  userIsNotRegisteredError: Error = {
    message: 'User is not registered',
    code: errorCode.userDoesNotExist,
  };

  wrongCredentialsError: Error = {
    message: 'Wrong credentials',
    code: errorCode.wrongCredentials,
  };

  loginFailed() {
    return this.loginFailedError;
  }

  userIsRegistered() {
    return this.userIsRegisteredError;
  }
  userIsNotRegistered() {
    return this.userIsNotRegisteredError;
  }
  wrongCredentials() {
    return this.wrongCredentialsError;
  }
}
