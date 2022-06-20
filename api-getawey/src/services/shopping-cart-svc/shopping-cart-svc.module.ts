import { Module } from '@nestjs/common';
import { ShoppingCartSvcController } from './shopping-cart-svc.controller';

@Module({
  controllers: [ShoppingCartSvcController],
})
export class ShoppingCartSvcModule {}
