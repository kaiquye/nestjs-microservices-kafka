import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/createUser.dto';
import { constants } from 'http2';
import { exists } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.appService.create(createUserDto);
  }
}
