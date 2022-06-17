import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async newUser(@Body() createUserDto: CreateUserDto) {
    await this.appService.create(createUserDto);
  }
}
