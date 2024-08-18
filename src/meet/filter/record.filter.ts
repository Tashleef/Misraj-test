import { meetStatus, Prisma, recordStatus } from '@prisma/client';

export class RecordFilter {
  where: Prisma.RecordWhereInput = {
    AND: [],
    OR: [],
  };

  constructor() {
    this.where = {
      AND: [],
      OR: [],
    };
  }

  getUser(userId: number) {
    if (!userId) return this;
    (this.where.AND as Array<Prisma.RecordWhereInput>).push({
      userId,
    });

    return this;
  }

  getStatus(status: recordStatus) {
    if (!status) return this;
    (this.where.AND as Array<Prisma.RecordWhereInput>).push({
      status,
    });

    return this;
  }

  build() {
    const result: Prisma.RecordWhereInput = {};
    if ((this.where.AND as Array<Prisma.RecordWhereInput>).length)
      result.AND = this.where.AND;
    if ((this.where.OR as Array<Prisma.RecordWhereInput>).length)
      result.OR = this.where.OR;
    return result;
  }
}
