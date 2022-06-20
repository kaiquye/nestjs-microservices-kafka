import { Exceptions } from './HttpExceptions';
import { RpcException } from '@nestjs/microservices';

/**
 * posso retornar um modelo de erro para tratar ou um http  Exception
 */

export class AppError extends Error {
  private status: number;
  constructor(message, status) {
    super(message);
    this.status = status;
  }

  get Exception() {
    throw new Exceptions(this.message, this.status);
  }

  get rpcException() {
    throw new RpcException(this.message);
  }
}
