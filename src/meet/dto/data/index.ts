import { meetStatus } from '@prisma/client';
import { User } from 'src/user/dto/data';

export interface Meet {
  id: number;
  uuid: string;
  status: meetStatus;
  users: User[];
  recording?: any[];
}
