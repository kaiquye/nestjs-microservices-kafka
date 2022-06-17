import { Exceptions } from './HttpException';

export class AppError extends Error {
  private status: number;
  constructor(message, status, data?) {
    super(message);
    this.status = status;
  }

  get Exception() {
    throw new Exceptions(this.message, this.status);
  }
}
