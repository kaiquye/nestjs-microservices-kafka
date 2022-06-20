import { Controller, Get, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { KafkaMessage } from 'kafkajs';
import { IProductSvc } from './interfaces/IProduct';
import { ExceptionFilter } from './Exceptions/RpcException';
import { IUserPayload } from './interfaces/IUserPayload';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @UseFilters(new ExceptionFilter())
  @MessagePattern('new-product')
  newProduct(@Payload() { value }: KafkaMessage): any {
    console.log('-------', value);
    const Payload: IProductSvc & IUserPayload = { ...value['data'] };
    return this.appService.newProduct({
      bar_code: Payload.bar_code,
      model: Payload.model,
      name: Payload.name,
      quantities: Payload.quantities,
    });
  }

  @UseFilters(new ExceptionFilter())
  @MessagePattern('count-product')
  validadeProduct(@Payload() { value }: KafkaMessage) {
    console.log(value);
    const Payload = {
      ...value['data'],
    };
    return this.appService.countProduct(Payload);
  }
}
