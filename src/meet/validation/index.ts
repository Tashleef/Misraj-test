import { Injectable } from '@nestjs/common';
import { MeetParams } from '../dto/request';
import * as joi from 'joi';
import { JoiValidationPipe } from 'package/validation/joi.pips';
@Injectable()
export class MeetValidation {
  meetParams({ params }: { params: MeetParams }) {
    const paramsId = joi
      .object<MeetParams>({
        id: joi.string().uuid().required(),
      })
      .required();
    return new JoiValidationPipe(paramsId).transform(params);
  }
}
