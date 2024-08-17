import { Meet } from '../data';

export class GetMeetById {
  id: string;
  status: string;
  users: {
    id: number;
    fullName: string;
  }[];
  constructor({ meet }: { meet: Meet }) {
    this.id = meet.uuid;
    this.status = meet.status;
    this.users = meet.users.map((user) => {
      return {
        id: user.id,
        fullName: user.fullName,
      };
    });
  }

  toObject(): {
    id: string;
    status: string;
    users: {
      id: number;
      fullName: string;
    }[];
  } {
    return {
      id: this.id,
      status: this.status,
      users: this.users,
    };
  }
}
