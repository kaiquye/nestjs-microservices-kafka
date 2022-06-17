import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserRepository } from './repository/user-repository';
import { PrismaService } from './database/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [AppController],
  providers: [AppService, UserRepository, PrismaService],
  exports: [AppService],
})
export class AppModule {}
