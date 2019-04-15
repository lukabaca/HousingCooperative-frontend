import {HousingCooperative} from './housingCooperative';
import {Premise} from "./premise";

export class Building {
  id: number;
  number: number;
  address: string;
  city: string;
  housingCooperative: HousingCooperative;
  premises: Premise[];
}
