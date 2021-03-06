import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async getTokenLogin(@Req() req) {
    return this.authServices.getToken(req.user);
  }
}
