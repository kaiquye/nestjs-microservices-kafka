import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserRepository } from './repository/UserRepository';
import { PrismaService } from './database/config';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UserRepository, PrismaService],
})
export class AppModule {}
