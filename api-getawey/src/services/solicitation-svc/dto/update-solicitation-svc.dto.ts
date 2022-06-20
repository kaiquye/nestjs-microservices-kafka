import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitationSvcDto } from './create-solicitation-svc.dto';

export class UpdateSolicitationSvcDto extends PartialType(CreateSolicitationSvcDto) {}
