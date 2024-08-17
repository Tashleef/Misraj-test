import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthApiService } from 'src/auth/service/auth-api.service';
import { AuthValidation } from '../validation';
import { AuthGuard } from '@nestjs/passport';
import { passportStrategy } from 'package/strategies/constant';
import { CreateUser } from '../dto/request';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthApiService,
    private readonly authValidation: AuthValidation,
  ) {}

  @Post('/signup')
  async signup(@Body() body: CreateUser) {
    this.authValidation.signup({ body });
    await this.authService.isRegistered(body.username);
    const user = await this.authService.create(body);
    return await this.authService.login(user);
    // return { id: user.id };
  }

  @UseGuards(AuthGuard(passportStrategy.local))
  @Post('/login')
  async login(@Req() { user }) {
    return await this.authService.login(user);
  }
}
