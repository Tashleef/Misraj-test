import { Injectable } from '@nestjs/common';
import { hashPassword } from 'package/utils/bcrypt/bcrypt';
import { CreateUser } from 'src/auth/dto/request';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByUsername(username: string) {
    const user = await this.prismaService.user.findFirst({
      where: { username },
    });

    if (!user) {
      // throw new HttpException(this.)
    }

    return user;
  }

  async createUser(data: CreateUser) {
    const { password, ...user } = data;
    const hashedPassword = await hashPassword(password);
    const createdUser = await this.prismaService.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });

    return createdUser;
  }
}
