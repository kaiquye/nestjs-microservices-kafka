import { Controller, OnModuleInit, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Client,
  ClientKafka,
  MessagePattern,
  Payload,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { KafkaMessage } from 'kafkajs';
import { IUserPayload } from './interface/IUser.payload';
import { IProductSvc } from './interface/IProduct';
import { AppError } from './model/AppError';
import { ExceptionFilter } from './model/RpcException';
import { map, tap } from 'rxjs';

@Controller()
export class AppController implements OnModuleInit {
  constructor(private readonly appService: AppService) {}

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'shopping-cart-svc',
        brokers: ['host.docker.internal:9094'],
      },
      consumer: {
        groupId: 'shopping-cart-svc-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  private client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('add-new-products-to-cart');
    this.client.subscribeToResponseOf('count-product');
    await this.client.connect();
  }

  @UseFilters(new ExceptionFilter())
  @MessagePattern('add-new-products-to-cart')
  async newCart(@Payload() { value }: KafkaMessage): Promise<any> {
    console.log('----');
    const Payload: IUserPayload & IProductSvc = { ...value['data'] };
    return this.appService.newCartByConsumer(Payload);
  }
}
