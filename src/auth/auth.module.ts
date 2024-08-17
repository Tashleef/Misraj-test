import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'package/strategies/jwt/jwt.constants';
import { LocalStrategy } from 'package/strategies/local-strategy';
import { JwtStrategy } from 'package/strategies/jwt/jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthApiService } from './service/auth-api.service';
import { AuthController } from './controller/auth-api.controller';
import { AuthError } from './service/auth-error.service';
import { UserModule } from 'src/user/user.module';
import { AuthValidation } from './validation';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    AuthApiService,
    AuthError,
    AuthValidation,
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
