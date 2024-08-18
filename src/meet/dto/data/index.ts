import { meetStatus, recordStatus } from '@prisma/client';
import { User } from 'src/user/dto/data';

export interface Meet {
  id: number;
  uuid: string;
  status: meetStatus;
  users: User[];
  record?: Record[];
}

export interface Record {
  id: number;
  meetId: number;
  userId: number;
  meet?: Meet;
  user?: User;
  duration: number;
  status: recordStatus;
  recordingSince: Date;
}
