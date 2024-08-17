import { Injectable } from '@nestjs/common';
import * as joi from 'joi';
import { JoiValidationPipe } from 'package/validation/joi.pips';
import { validationSchema } from 'package/validation';
import { CreateUser } from '../dto/request';
import { LoginDto } from '../dto/response';

@Injectable()
export class AuthValidation {
  login(body: LoginDto) {
    const loginSchema = joi.object<LoginDto>({
      username: joi.string().required().min(4),
      password: joi.string().min(8).required(),
    });
    return new JoiValidationPipe(loginSchema).transform(body);
  }

  signup({ body }: { body: CreateUser }) {
    const create = joi.object<CreateUser>({
      username: joi.string().min(4).required(),
      fullName: joi.string().min(4).required(),
      password: joi.string().min(8).required(),
    });
    return new JoiValidationPipe(create).transform(body);
  }
}
