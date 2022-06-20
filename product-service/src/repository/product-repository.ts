import { AbstractRepository } from './AbstractRepository';
import { IProductSvc } from '../interfaces/IProduct';
import { PrismaService } from '../database/configDatabase';
import { TABLE_ENUM } from '../enum/enum-table';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository extends AbstractRepository<IProductSvc> {
  constructor(private prisma: PrismaService) {
    super(TABLE_ENUM.product, prisma);
  }

  async countProduct(bar_code) {
    const { quantities } = await this.prisma.pRODUCT.findFirst({
      where: {
        bar_code: bar_code,
      },
    });
    console.log(quantities);
    return quantities;
  }
}
