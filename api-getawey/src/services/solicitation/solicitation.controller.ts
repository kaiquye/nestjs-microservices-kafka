import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolicitationService } from './solicitation.service';
import { CreateSolicitationDto } from './dto/create-solicitation.dto';
import { UpdateSolicitationDto } from './dto/update-solicitation.dto';

@Controller('solicitation')
export class SolicitationController {
  constructor(private readonly solicitationService: SolicitationService) {}

  @Post()
  create(@Body() createSolicitationDto: CreateSolicitationDto) {
    return this.solicitationService.create(createSolicitationDto);
  }

  @Get()
  findAll() {
    return this.solicitationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolicitationDto: UpdateSolicitationDto) {
    return this.solicitationService.update(+id, updateSolicitationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitationService.remove(+id);
  }
}
