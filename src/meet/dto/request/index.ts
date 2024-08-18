import { meetStatus } from '@prisma/client';
import { Pagination } from 'package/pagination/dto';

export class GetAllRecordedMeetings extends Pagination {
  status: meetStatus;
  meetId: number;
}

export interface MeetParams {
  id: string;
}
