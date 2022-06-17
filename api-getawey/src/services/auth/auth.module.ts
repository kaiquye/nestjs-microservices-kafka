import { forwardRef, Module, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AppModule } from '../../app.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStategies } from './strategys/local.strategy';
import { PrismaService } from '../../database/config';
import { JwtStrategy } from './strategys/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => AppModule),
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '120s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStategies, PrismaService, JwtStrategy],
})
export class AuthModule {}
