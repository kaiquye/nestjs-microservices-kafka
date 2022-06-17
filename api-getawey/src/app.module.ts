import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserRepository } from './repository/user-repository';
import { PrismaService } from './database/config';
import { AuthModule } from './services/auth/auth.module';
import { ShoppingCartModule } from './services/shopping-cart/shopping-cart.module';
import { SolicitationModule } from './services/solicitation/solicitation.module';
import { ProviderModule } from './services/provider/provider.module';

@Module({
  imports: [forwardRef(() => AuthModule), ShoppingCartModule, SolicitationModule, ProviderModule], // erro de instacia
  controllers: [AppController],
  providers: [AppService, UserRepository, PrismaService],
  exports: [AppService],
})
export class AppModule {}
