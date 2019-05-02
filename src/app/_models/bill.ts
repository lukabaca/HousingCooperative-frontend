import {Measurement} from './measurement';

export class Bill {
  id: number;
  electricityCost: number;
  hotWaterCost: number;
  coldWaterCost: number;
  heatingCost: number;
  paid: boolean;
  checked: boolean;
  accepted: boolean;
  measurement: Measurement;
}
