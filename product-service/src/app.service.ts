import { Injectable } from '@nestjs/common';
import { ProductRepository } from './repository/product-repository';
import { CreateProductSvcDto } from './dto/CreateProductSvc.dto';
import { AppError } from './Exceptions/AppError';

@Injectable()
export class AppService {
  constructor(private Repository: ProductRepository) {}

  async newProduct(project: CreateProductSvcDto): Promise<any> {
    const exist = await this.Repository.exists(false, {
      OR: [{ bar_code: project.bar_code }],
    });
    if (exist) {
      console.log('product already registered');
      return new AppError('product already registered', 409).rpcException;
    }
    console.log(exist);
    await this.Repository.create(project);
  }

  async countProduct(bar_code: number) {
    return this.Repository.countProduct(bar_code);
  }
}
