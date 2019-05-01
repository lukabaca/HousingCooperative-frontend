import {Premise} from './premise';

export class Measurement {
  id: number;
  electricity: number;
  hotWater: number;
  coldWater: number;
  heating: number;
  accepted: boolean;
  checked: boolean;
  month: number;
  year: number;
  premise: Premise;
}
