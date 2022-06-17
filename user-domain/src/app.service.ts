import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user-repository';
import { CreateUserDto } from './dto/createUser.dto';
import { AppError } from './model/AppError';
import { hashSync } from 'bcrypt';
import { IUser } from './interfaces/IUser';

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

  async findUserOrFailByEmail(email: string): Promise<IUser> {
    console.log(email);
    try {
      const { id, phone, password, fist_name, last_name } =
        await this.userRepository.findoneorfail({
          email: email,
        });
      return { id, phone, password, email, fist_name, last_name };
    } catch (err) {
      new AppError('not found', 404).Exception;
    }
  }
}
