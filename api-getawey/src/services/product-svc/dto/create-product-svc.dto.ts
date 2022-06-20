import {
  IsString,
  IsInt,
  IsNumber,
  IsPhoneNumber,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';
import { IProductSvc } from '../interfaces/product-svc.entity';
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
