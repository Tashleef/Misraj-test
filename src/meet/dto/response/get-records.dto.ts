import { Record } from '../data';

export class GetRecords {
  id: number;
  status: string;
  duration: number;
  constructor({ record }: { record: Record }) {
    this.id = record.id;
    this.status = record.status;
    this.duration = record.duration;
  }

  toObject(): {
    id: number;
    status: string;
    duration: number;
  } {
    return {
      id: this.id,
      status: this.status,
      duration: this.duration,
    };
  }
}
