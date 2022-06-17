import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user-repository';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class AppService {
  constructor(private userRepository: UserRepository) {}
  create(userDto: CreateUserDto) {
    console.log(userDto);
  }
}
