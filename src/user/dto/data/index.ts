import { Meet } from 'src/meet/dto/data';

export interface User {
  id: number;
  username: string;
  fullName: string;
  password: string;
  meetings?: Meet[];
}
