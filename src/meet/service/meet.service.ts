import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { meetStatus, recordStatus, User } from '@prisma/client';
import { Params } from 'package/component/params/params';
import { Pagination } from 'package/pagination/dto';
import { IUser } from 'package/strategies/jwt/jwt-payload';
import { PrismaService } from 'src/prisma/prisma.service';
import { MeetParams } from '../dto/request';
import { MeetError } from './meet-error.service';
import { Meet } from '../dto/data';

@Injectable()
export class MeetApiService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly meetError: MeetError,
  ) {}

  async create(user: IUser) {
    return await this.prismaService.meet.create({
      data: {
        users: {
          connect: [
            {
              id: user.id,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });
  }

  async joinMeet({ id }: MeetParams, user: IUser) {
    const meet = await this.getOngoingMeetByUUID(id);
    this.validateIfNotJoined(meet, user);

    await this.prismaService.meet.update({
      where: { id: meet.id },
      data: {
        users: {
          connect: { id: user.id },
        },
      },
    });
    return;
  }
  async leaveMeet({ id }: MeetParams, user: IUser) {
    const meet = await this.getOngoingMeetByUUID(id);
    this.validateIfJoined(meet, user);

    await this.prismaService.meet.update({
      where: { id: meet.id },
      data: {
        status: meet.users.length === 1 ? meetStatus.ended : meetStatus.ongoing,
        users: {
          disconnect: { id: user.id },
        },
      },
    });
    return;
  }

  async startRecording({ id }: MeetParams, user: IUser) {
    const meet = await this.getOngoingMeetByUUID(id);
    this.validateIfJoined(meet, user);
    const retrievedRecord = await this.prismaService.record.findFirst({
      where: {
        userId: user.id,
        meetId: meet.id,
        status: {
          in: [recordStatus.ongoing, recordStatus.paused],
        },
      },
    });

    if (retrievedRecord) {
      throw new HttpException(
        this.meetError.meetingIsAlreadyRecorded(),
        HttpStatus.BAD_REQUEST,
      );
    }

    const savedRecord = await this.prismaService.record.create({
      data: {
        meetId: meet.id,
        userId: user.id,
        status: recordStatus.ongoing,
        recordingSince: new Date(),
        duration: 0,
      },
    });

    return savedRecord;
  }

  async stopRecording({ id }: MeetParams, user: IUser) {
    const meet = await this.getOngoingMeetByUUID(id);
    this.validateIfJoined(meet, user);
    const retrievedRecord = await this.prismaService.record.findFirst({
      where: {
        userId: user.id,
        meetId: meet.id,
        status: {
          in: [recordStatus.ongoing, recordStatus.paused],
        },
      },
    });

    if (!retrievedRecord) {
      throw new HttpException(
        this.meetError.meetingIsNotBeingRecorded(),
        HttpStatus.BAD_REQUEST,
      );
    }

    const data = {
      status: recordStatus.ended,
      duration: retrievedRecord.duration,
    };

    if (retrievedRecord.status === recordStatus.ongoing) {
      data.duration =
        data.duration +
        Math.floor(
          (new Date().getTime() - retrievedRecord.recordingSince.getTime()) /
            1000,
        );
    }

    console.log(data);

    await this.prismaService.record.update({
      where: {
        id: retrievedRecord.id,
      },
      data,
    });
    return;
  }

  async pauseUnPause({ id }: MeetParams, user: IUser) {
    const meet = await this.getOngoingMeetByUUID(id);
    this.validateIfJoined(meet, user);
    const record = await this.prismaService.record.findFirst({
      where: {
        userId: user.id,
        meetId: meet.id,
        status: {
          in: [recordStatus.ongoing, recordStatus.paused],
        },
      },
    });
    if (!record) {
      throw new HttpException(
        this.meetError.meetingIsNotBeingRecorded(),
        HttpStatus.BAD_REQUEST,
      );
    }

    const data = {
      duration: record.duration,
      recordingSince: record.recordingSince,
      status: record.status,
    };

    if (record.status === recordStatus.ongoing) {
      // pause the record
      data.status = recordStatus.paused;
      data.duration =
        data.duration +
        Math.floor(new Date().getTime() - record.recordingSince.getTime()) /
          1000;
    }
    if (record.status === recordStatus.paused) {
      // resume the record
      data.status = recordStatus.ongoing;
      data.recordingSince = new Date();
    }

    await this.prismaService.record.update({
      where: {
        id: record.id,
      },
      data,
    });
  }

  async getOne({ id }: MeetParams, user: IUser) {
    const meet = await this.prismaService.meet.findFirst({
      where: {
        uuid: id,
        users: { some: { id: user.id } },
        status: meetStatus.ongoing,
      },
      include: {
        users: true,
      },
    });

    if (!meet) {
      throw new HttpException(
        this.meetError.notFoundMeet(),
        HttpStatus.NOT_FOUND,
      );
    }

    return meet;
  }

  // async getAll({ limit, skip }: Pagination) {}

  async getOngoingMeetByUUID(uuid: string) {
    const meet = await this.prismaService.meet.findFirst({
      where: { uuid, status: meetStatus.ongoing },
      include: {
        users: true,
      },
    });

    if (!meet) {
      throw new HttpException(
        this.meetError.notFoundMeet(),
        HttpStatus.NOT_FOUND,
      );
    }

    return meet;
  }

  validateIfJoined(meet: Meet, user: IUser) {
    const inTheMeeting = meet.users.some((meetUser) => meetUser.id === user.id);
    if (!inTheMeeting) {
      throw new HttpException(
        this.meetError.notInTheMeet(),
        HttpStatus.BAD_REQUEST,
      );
    }

    return;
  }
  validateIfNotJoined(meet: Meet, user: IUser) {
    const inTheMeeting = meet.users.some((meetUser) => meetUser.id === user.id);
    if (inTheMeeting) {
      throw new HttpException(
        this.meetError.alreadyInTheMeet(),
        HttpStatus.BAD_REQUEST,
      );
    }

    return;
  }
}
