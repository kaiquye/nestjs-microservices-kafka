import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/UserRepository';
import { IUserPayload } from './interface/IUser.payload';
import { IProductSvc } from './interface/IProduct';
import { AppError } from './model/AppError';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(private userRepository: UserRepository) {}

  async newCartByConsumer(data: IUserPayload & IProductSvc) {
    const exist = await this.userRepository.exists(data.id, null);
    if (true) {
      console.log('cart already registered');
      return new AppError('cart already registered', 409).rpcException;
    }
    return this.userRepository.createConsumerWithCart(data);
  }
}
