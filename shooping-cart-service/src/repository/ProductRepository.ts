import { AbstractRepository } from './AbstractRepositorty';
import { IProductSvc } from '../interface/IProduct';
import { PrismaService } from '../database/config';
import { TABLE_ENUM } from '../enum/table.enum';
import { IUserPayload } from '../interface/IUser.payload';

export class UserRepository extends AbstractRepository<IProductSvc> {
  constructor(private prisma: PrismaService) {
    super(TABLE_ENUM.product, prisma);
  }
}
