import {
  Body,
  Controller,
  OnModuleInit,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { IUserPayload } from '../../interfaces/IUser.payload';
import { CreateProductSvcDto } from '../product-svc/dto/create-product-svc.dto';
import { Observable, tap } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { InterceptorsSvc } from '../../Interceptors/Observable';
import { AppError } from '../../model/AppError';

@Controller('cart')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(new InterceptorsSvc())
export class ShoppingCartSvcController implements OnModuleInit {
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

  @Post()
  async addItemInCart(
    @Body() body: CreateProductSvcDto,
    @Req() req,
  ): Promise<Observable<any>> {
    const Payload: IUserPayload & CreateProductSvcDto = {
      ...body,
      ...req.user,
    };
    return this.client.send('add-new-products-to-cart', { data: Payload });
  }
}
