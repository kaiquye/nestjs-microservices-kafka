import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user-repository';
import { CreateUserDto } from './dto/createUser.dto';
import { AppError } from './model/AppError';
import { hashSync } from 'bcrypt';

@Injectable()
export class AppService {
  constructor(private userRepository: UserRepository) {}
  async create(userDto: CreateUserDto) {
    const exist = await this.userRepository.exists(false, {
      OR: [
        { password: userDto.password },
        { phone: userDto.phone },
        { email: userDto.email },
      ],
    });
    if (exist) new AppError('conflit', 409).Exception;
    userDto.password = hashSync(userDto.password, 10);
    return await this.userRepository.create(userDto);
  }

  async findUserOrFailByEmail(email: string) {
    console.log(email);
    try {
      const { id, fist_name, phone } = await this.userRepository.findoneorfail({
        email: email,
      });
      console.log(id);
    } catch (err) {
      new AppError('not found', 404).Exception;
    }
  }
}
