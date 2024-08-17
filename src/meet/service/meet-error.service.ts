import { Injectable } from '@nestjs/common';
import { Error } from 'package/utils/Error/error';
import { errorCode } from 'package/utils/Error/error-codes';

@Injectable()
export class MeetError {
  private notFoundMeetError: Error = {
    message: 'Not Found Meet',
    code: errorCode.meetNotFound,
  };

  private alreadyInTheMeetError: Error = {
    message: 'User has already joined the meet',
    code: errorCode.alreadyInTheMeet,
  };

  private notInTheMeetError: Error = {
    message: 'User is not in the meet',
    code: errorCode.notInTheMeet,
  };

  private meetingIsNotBeingRecordedError: Error = {
    message: 'meeting is not being recorded',
    code: errorCode.meetingIsNotRecorded,
  };

  private meetingIsAlreadyRecordedError: Error = {
    message: 'meeting is already being recorded',
    code: errorCode.meetingIsAlreadyRecorded,
  };

  notFoundMeet() {
    return this.notFoundMeetError;
  }

  alreadyInTheMeet() {
    return this.alreadyInTheMeetError;
  }

  notInTheMeet() {
    return this.notInTheMeetError;
  }

  meetingIsAlreadyRecorded() {
    return this.meetingIsAlreadyRecordedError;
  }

  meetingIsNotBeingRecorded() {
    return this.meetingIsNotBeingRecordedError;
  }
}
