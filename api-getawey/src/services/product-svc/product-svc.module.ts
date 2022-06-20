import { Module } from '@nestjs/common';
import { ProductSvcController } from './product-svc.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
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
      },
    ]),
  ],
  controllers: [ProductSvcController],
})
export class ProductSvcModule {}
