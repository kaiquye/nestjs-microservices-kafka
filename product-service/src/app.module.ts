import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductRepository } from './repository/product-repository';
import { PrismaService } from './database/configDatabase';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ProductRepository, PrismaService],
})
export class AppModule {}
