import { PrismaClient } from '@prisma/client';
import { TABLE_ENUM } from '../enum/enum-table.db';

interface Reader<T> {
  find(): Promise<T[]>;

  findOne(id: number);

  exists(id: number, where: T): Promise<boolean>;
}

interface Writer<T> {
  create(data: T): Promise<void | T>;

  update(id: number, item: Partial<T>): Promise<boolean>;

  delete(id: number): Promise<boolean>;
}

type Repository<T> = Reader<T> & Writer<T>;

export abstract class AbstractRepository<T> implements Repository<T> {
  private query: PrismaClient;
  private tableName: TABLE_ENUM;

  protected constructor(tableName: TABLE_ENUM, queryBuilder) {
    this.query = queryBuilder;
    this.tableName = tableName;
  }

  create(data: T): Promise<T> {
    return this.query[`${this.tableName.toString()}`].create({ data });
  }

  find(): Promise<T[]> {
    return this.query[`${this.tableName.toString()}`].findMany();
  }

  findOne(id: number) {
    this.query[`${this.tableName.toString()}`].findFirst({
      where: {
        id: id,
      },
    });
  }

  async exists(id: number | boolean, where: T): Promise<boolean> {
    if (id < 0 || id !== undefined || id !== null || id !== false) {
      const check = await this.query[`${this.tableName.toString()}`].findFirst({
        where: {
          id: id,
        },
      });
      console.log(check);
      return check !== null ? true : false;
    } else {
      console.log(where);
      delete where['id'];
      const check = await this.query[`${this.tableName.toString()}`].findFirst({
        where,
      });
      console.log('check', check);
      return check !== null ? true : false;
    }
  }

  update(id: number, item: Partial<T>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
