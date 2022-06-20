import { IsString, IsNumber } from 'class-validator';
import { IProductSvc } from '../interfaces/IProduct';

export class CreateProductSvcDto implements IProductSvc {
  @IsNumber()
  bar_code: number;
  @IsString()
  model: string;
  @IsString()
  name: string;
  @IsNumber()
  quantities: number;
}
