import { Injectable } from '@nestjs/common';
import { AppService } from '../../app.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userServices: AppService,
    private readonly jwt: JwtService,
  ) {}
  async getToken(userPayload) {
    return {
      token: this.jwt.sign({
        email: userPayload.email,
        id: userPayload.id,
        phone: userPayload.phone.toString(),
        fist_name: userPayload.fist_name
      }),
    };
  }
  async validadeUser(email: string, password: string) {
    try {
      const user = await this.userServices.findUserOrFailByEmail(email);
      const match = compareSync(password, user.password);
      if (!match) return null;
      return user;
    } catch (erro) {
      return null;
    }
  }
}
