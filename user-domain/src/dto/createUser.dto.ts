import { IUser } from '../interfaces/IUser';
import {
  IsString,
  IsInt,
  IsNumber,
  IsPhoneNumber,
  IsEmail,
} from 'class-validator';
import { hashSync } from 'bcrypt';

export class CreateUserDto implements IUser {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  fist_name: string;
  @IsString()
  last_name?: string;
  @IsString()
  password: string;
  @IsNumber()
  phone: number;
}
