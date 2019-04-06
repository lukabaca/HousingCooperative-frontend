import {Role} from './role';
import {Token} from './token';

export class User {
  id: number;
  email: string;
  password: string;
  role: Role;
  token?: Token;
}
