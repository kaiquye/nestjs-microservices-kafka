import { IProductSvc } from '../interface/IProduct';
import { IsString, IsNumber } from 'class-validator';

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
