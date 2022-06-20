import { AbstractRepository } from './AbstractRepositorty';
import { IProductSvc } from '../interface/IProduct';
import { PrismaService } from '../database/config';
import { TABLE_ENUM } from '../enum/table.enum';
import { IUserPayload } from '../interface/IUser.payload';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends AbstractRepository<IUserPayload> {
  constructor(private prisma: PrismaService) {
    super(TABLE_ENUM.user, prisma);
  }

  createConsumerWithCart(data: IUserPayload & IProductSvc) {
    return this.prisma.cONSUMER.create({
      data: {
        phone: Number(data.phone),
        email: data.email,
        fist_name: data.fist_name,
        id: data.id,
        products: {
          create: {
            bar_code: data.bar_code,
            id: data.id,
            name: data.name,
            model: data.model,
            quantities: data.quantities,
          },
        },
      },
      include: { products: true },
    });
  }
}
