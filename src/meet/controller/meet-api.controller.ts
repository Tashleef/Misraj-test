import { AuthenticatedController } from 'package/decorator/authentication/authenticated-controller.decorator';
import { MeetApiService } from '../service/meet.service';
import { AuthorizedApi } from 'package/decorator/authorization/authorization.decorator';
import { Api } from 'package/utils/api-methods';
import { Params } from 'package/component/params/params';
import { Param, Query, UseGuards } from '@nestjs/common';
import { privilegeKeys } from 'package/utils/enums/privilege.enum';
import { User } from 'package/decorator/param/user.decorator';
import { Pagination } from 'package/pagination/dto';
import { IUser } from 'package/strategies/jwt/jwt-payload';
import { MeetParams } from '../dto/request';
import { GetMeetById } from '../dto/response/get-meet-by-id.dto';
import { MeetValidation } from '../validation';
import { InMeet } from '../guard/in-meet.guard';

// authenticated controller is used for authentication
// and as we are using recording we need to know the identity of the user that is recording
@AuthenticatedController({ controller: 'meet' })
export class MeetController {
  constructor(
    private readonly meetService: MeetApiService,
    private readonly meetValidation: MeetValidation,
  ) {}

  @AuthorizedApi({
    api: Api.POST,
    url: '/',
  })
  async create(@User() user: IUser) {
    const meet = await this.meetService.create(user);
    return { id: meet.uuid };
  }

  @AuthorizedApi({
    api: Api.PATCH,
    url: '/:id/join',
  })
  async joinMeet(@Param() params: MeetParams, @User() user) {
    this.meetValidation.meetParams({ params });
    return await this.meetService.joinMeet(params, user);
  }

  @AuthorizedApi({
    api: Api.PATCH,
    url: '/:id/leave',
  })
  async leaveMeet(@Param() params: MeetParams, @User() user: IUser) {
    this.meetValidation.meetParams({ params });
    return await this.meetService.leaveMeet(params, user);
  }

  @AuthorizedApi({
    api: Api.POST,
    url: '/:id/start-recording',
  })
  async startRecording(@Param() params: MeetParams, @User() user: IUser) {
    this.meetValidation.meetParams({ params });
    const record = await this.meetService.startRecording(params, user);
    return { id: record.id };
  }

  @AuthorizedApi({
    api: Api.PATCH,
    url: '/:id/pause-resume',
  })
  async pauseUnpause(@Param() params: MeetParams, @User() user: IUser) {
    this.meetValidation.meetParams({ params });
    return await this.meetService.pauseUnPause(params, user);
  }

  @AuthorizedApi({
    api: Api.PATCH,
    url: '/:id/stop-recording',
  })
  async stopRecording(@Param() params: MeetParams, @User() user: IUser) {
    this.meetValidation.meetParams({ params });
    return await this.meetService.stopRecording(params, user);
  }

  @AuthorizedApi({
    api: Api.GET,
    url: '/:id',
  })
  async getOne(@Param() params: MeetParams, @User() user: IUser) {
    this.meetValidation.meetParams({ params });
    const meet = await this.meetService.getOne(params, user);
    return new GetMeetById({ meet }).toObject();
  }
}
