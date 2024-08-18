import { Injectable } from '@nestjs/common';
import { GetAllRecordedMeetings, MeetParams } from '../dto/request';
import * as joi from 'joi';
import { JoiValidationPipe } from 'package/validation/joi.pips';
import { pagination } from 'package/pagination/validation';
import { validationSchema } from 'package/validation';
import { recordStatus } from '@prisma/client';
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

  getAllRecordedMeeting({ query }: { query: GetAllRecordedMeetings }) {
    const getAll = joi.object({
      ...pagination(),
      meetId: validationSchema.id(),
      status: joi.string().valid(...Object.values(recordStatus)),
    });

    return new JoiValidationPipe(getAll).transform(query);
  }
}
