import { Pagination } from 'package/pagination/dto';

export class GetAllRecordedMeetings extends Pagination {
  date: Date;
  userId: number;
}

export interface MeetParams {
  id: string;
}
