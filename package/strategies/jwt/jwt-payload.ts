import { User } from '@prisma/client';

export interface IUser {
  id: number;
}

export function buildJWTPayload(user: User) {
  const { id } = user;

  const result: IUser = {
    id,
  };
  return result;
}
