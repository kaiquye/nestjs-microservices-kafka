import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingCartSvcDto } from './create-shopping-cart-svc.dto';

export class UpdateShoppingCartSvcDto extends PartialType(CreateShoppingCartSvcDto) {}
