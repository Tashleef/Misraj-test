import { Module } from '@nestjs/common';
import { MeetController } from './controller/meet-api.controller';
import { MeetApiService } from './service/meet.service';
import { MeetError } from './service/meet-error.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MeetValidation } from './validation';

@Module({
  imports: [PrismaModule],
  providers: [MeetApiService, MeetError, MeetValidation],
  controllers: [MeetController],
  exports: [],
})
export class MeetModule {}
