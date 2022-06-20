import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async newUser(@Body() createUserDto: CreateUserDto) {
    await this.appService.create(createUserDto);
  }
}
