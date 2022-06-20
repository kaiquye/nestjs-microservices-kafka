import {
  Controller,
  Post,
  Body,
  OnModuleInit,
  Res,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { CreateProductSvcDto } from './dto/create-product-svc.dto';
import { map, Observable, catchError, tap, throwError } from 'rxjs';
import { Exceptions } from '../../model/HttpException';
import { AuthGuard } from '@nestjs/passport';
import { IUserPayload } from '../../interfaces/IUser.payload';
import { InterceptorsSvc } from '../../Interceptors/Observable';

@Controller('product-service')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(new InterceptorsSvc())
export class ProductSvcController implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'product-svc',
        brokers: ['host.docker.internal:9094'],
      },
      consumer: {
        groupId: 'product-svc-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  private client: ClientKafka;
  async onModuleInit() {
    this.client.subscribeToResponseOf('new-product');
    await this.client.connect();
  }

  @Post()
  newProduct(@Body() body: CreateProductSvcDto, @Req() res): Observable<any> {
    const payload: IUserPayload & CreateProductSvcDto = {
      ...body,
      ...res.user,
    };
    console.log('aqui...');
    return this.client.send('new-product', {
      data: payload,
    });
  }
}
