import { AbstractRepository } from './AbstractRepository';
import { Injectable } from '@nestjs/common';
import { IUser } from '../interfaces/IUser';
import { TABLE_ENUM } from '../enum/enum-table.db';
import { PrismaService } from '../database/config';

@Injectable()
export class UserRepository extends AbstractRepository<IUser> {
  constructor(private prisma: PrismaService) {
    super(TABLE_ENUM.user, prisma);
  }
}
