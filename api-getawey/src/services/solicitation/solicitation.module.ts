import { Module } from '@nestjs/common';
import { SolicitationService } from './solicitation.service';
import { SolicitationController } from './solicitation.controller';

@Module({
  controllers: [SolicitationController],
  providers: [SolicitationService]
})
export class SolicitationModule {}
