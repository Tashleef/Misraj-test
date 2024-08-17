import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserError } from './service/user-error.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserError],
  exports: [UserService, UserError],
})
export class UserModule {}
