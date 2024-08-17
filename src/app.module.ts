import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { ClsModule } from 'nestjs-cls';
import { PrismaService } from './prisma/prisma.service';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MeetModule } from './meet/meet.module';

@Module({
  imports: [
    ClsModule.forRoot({
      plugins: [
        new ClsPluginTransactional({
          imports: [PrismaModule],
          adapter: new TransactionalAdapterPrisma({
            prismaInjectionToken: PrismaService,
          }),
        }),
      ],
      global: true,
      middleware: { mount: true },
    }),

    AuthModule,
    UserModule,
    MeetModule,
  ],
})
export class AppModule {}
