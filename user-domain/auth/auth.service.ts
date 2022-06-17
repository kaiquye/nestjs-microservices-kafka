import { Injectable } from '@nestjs/common';
import { AppService } from '../src/app.service';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userServices: AppService) {}
  async teste() {
    console.log('teste');
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
