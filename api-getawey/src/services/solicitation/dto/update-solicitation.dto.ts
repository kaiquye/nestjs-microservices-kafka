import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitationDto } from './create-solicitation.dto';

export class UpdateSolicitationDto extends PartialType(CreateSolicitationDto) {}
