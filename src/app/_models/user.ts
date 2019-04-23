import {Role} from './role';
import {Token} from './token';
import {UserInfo} from './userInfo';

export class User {
  id: number;
  email: string;
  password: string;
  role: Role;
  token?: Token;
  userInfo: UserInfo;
}
