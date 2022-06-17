import { IUser } from '../interfaces/IUser';

export class CreateUserDto implements IUser {
  email: string;
  fist_name: string;
  id: number;
  last_name: string;
  password: string;
  phone: number;
}
