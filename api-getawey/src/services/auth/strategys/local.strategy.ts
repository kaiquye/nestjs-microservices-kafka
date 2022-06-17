import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStategies extends PassportStrategy(Strategy) {
  constructor(private authServices: AuthService) {
    super({ usernameField: 'email' });
  }
  async validate(email: string, password: string) {
    const user = await this.authServices.validadeUser(email, password);
    console.log(user);
    if (!user) throw new UnauthorizedException('email/password invalid');
    return user;
  }
}
