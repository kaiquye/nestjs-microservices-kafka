import { Module } from '@nestjs/common';
import { SolicitationSvcController } from './solicitation-svc.controller';

@Module({
  controllers: [SolicitationSvcController],
})
export class SolicitationSvcModule {}
