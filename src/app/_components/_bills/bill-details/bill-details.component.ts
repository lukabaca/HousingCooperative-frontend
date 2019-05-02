import { Component, OnInit } from '@angular/core';
import {Bill} from '../../../_models/bill';
import {BillService} from '../../../_services/bill.service';
import {ActivatedRoute} from '@angular/router';
import {SnackBarGenerator} from '../../../_helpers/snackBarGenerator';
import {AuthGuard} from '../../../_guards/auth.guard';
import {StateAcceptedRequest} from '../../../_models/_requests/stateAcceptedRequest';
import {BillPaymentStatusRequest} from '../../../_models/_requests/billPaymentStatusRequest';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.scss']
})
export class BillDetailsComponent implements OnInit {

  billId: string;
  bill: Bill;
  constructor(private billService: BillService,
              private route: ActivatedRoute,
              private snackBar: SnackBarGenerator,
              private  authGuard: AuthGuard) {
    if (this.route.snapshot.params.id) {
      this.billId = this.route.snapshot.params.id;
    }
  }

  ngOnInit() {
    this.getBill();
  }

  getBill() {
    this.billService.getBill(this.billId).subscribe((bill: Bill) => {
      if (bill) {
        this.bill = bill;
      }
    });
  }

  acceptBill() {
    let measurementStatus = new StateAcceptedRequest();
    measurementStatus.accepted = true;
    this.billService.changeBillStatus(this.billId, measurementStatus).subscribe(res => {
      this.snackBar.openSnackBar('Zaakceptowano rachunek', true);
      this.getBill();
    });
  }

  denyBill() {
    let measurementStatus = new StateAcceptedRequest();
    measurementStatus.accepted = false;
    this.billService.changeBillStatus(this.billId, measurementStatus).subscribe(res => {
      this.snackBar.openSnackBar('Odrzucono rachunek', true);
      this.getBill();
    });
  }

  payBill() {
    let paymentStatus = new BillPaymentStatusRequest();
    paymentStatus.paid = true;
    this.billService.changeBillPaymentStatus(this.billId, paymentStatus).subscribe(res => {
      this.snackBar.openSnackBar('Poprawnie opłacono rachunek', true);
      this.getBill();
    });
  }
}
