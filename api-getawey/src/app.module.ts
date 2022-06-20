import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserRepository } from './repository/user-repository';
import { PrismaService } from './database/config';
import { AuthModule } from './services/auth/auth.module';
import { ShoppingCartSvcModule } from './services/shopping-cart-svc/shopping-cart-svc.module';
import { SolicitationSvcModule } from './services/solicitation-svc/solicitation-svc.module';
import { ProductSvcModule } from './services/product-svc/product-svc.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    ShoppingCartSvcModule,
    SolicitationSvcModule,
    ProductSvcModule,
  ], // erro de instacia
  controllers: [AppController],
  providers: [AppService, UserRepository, PrismaService],
  exports: [AppService],
})
export class AppModule {}
