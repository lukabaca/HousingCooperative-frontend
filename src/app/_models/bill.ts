import {Measurement} from './measurement';

export class Bill {
  id: number;
  electricityCost: number;
  hotWaterCost: number;
  coldWaterCost: number;
  heatingCost: number;
  isPaid: boolean;
  isChecked: boolean;
  isAccepted: boolean;
  measurement: Measurement;
}
