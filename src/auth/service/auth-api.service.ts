import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthError } from './auth-error.service';
import { CreateUser } from '../dto/request';
import { buildJWTPayload } from 'package/strategies/jwt/jwt-payload';
import { PrismaService } from 'src/prisma/prisma.service';
import { comparePassword } from 'package/utils/bcrypt/bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class AuthApiService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly authError: AuthError,
    private readonly jwtService: JwtService,
  ) {}
  async validateAccount(username: string, password: string): Promise<User> {
    const account = await this.prismaService.user.findFirst({
      where: { username },
    });
    if (!account)
      throw new HttpException(
        this.authError.loginFailed(),
        HttpStatus.NOT_FOUND,
      );
    const isMatch = await comparePassword(password, account.password);
    if (!isMatch) {
      throw new HttpException(
        this.authError.loginFailed(),
        HttpStatus.BAD_REQUEST,
      );
    }
    return account;
  }

  async login(user: User) {
    const jwtPayload = buildJWTPayload(user);
    const response = {
      accessToken: this.jwtService.sign(jwtPayload),
      user: {
        id: jwtPayload.id,
      },
    };
    return response;
  }

  async isRegistered(username: string) {
    const user = await this.userService.findByUsername(username);
    if (user) {
      throw new HttpException(
        this.authError.userIsRegistered(),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async isNotRegistered(username: string) {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new HttpException(
        this.authError.userIsNotRegistered(),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(body: CreateUser) {
    const user = await this.userService.createUser(body);
    return user;
  }
}
