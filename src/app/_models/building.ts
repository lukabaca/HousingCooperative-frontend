import {HousingCooperative} from './housingCooperative';
import {Premise} from "./premise";
import {User} from './user';

export class Building {
  id: number;
  number: number;
  address: string;
  city: string;
  housingCooperative: HousingCooperative;
  premises: Premise[];
  managerId?: string;
  manager: User;
}
