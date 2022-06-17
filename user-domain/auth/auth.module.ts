import { forwardRef, Module, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AppModule } from '../src/app.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStategies } from './strategies/local.stategies';
import { AppService } from '../src/app.service';
import { UserRepository } from '../src/repository/user-repository';
import { PrismaService } from '../src/database/config';

@Module({
  imports: [
    forwardRef(() => AppModule),
    PassportModule,
    JwtModule.register({
      privateKey: '0000000000000000000000000000',
      signOptions: { expiresIn: '120s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStategies, PrismaService],
})
export class AuthModule {}
