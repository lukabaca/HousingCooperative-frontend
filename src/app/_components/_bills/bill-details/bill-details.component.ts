import { Component, OnInit } from '@angular/core';
import {Bill} from '../../../_models/bill';
import {BillService} from '../../../_services/bill.service';
import {ActivatedRoute} from '@angular/router';
import {SnackBarGenerator} from '../../../_helpers/snackBarGenerator';

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
              private snackBar: SnackBarGenerator) {
    if (this.route.snapshot.params.id) {
      this.billId = this.route.snapshot.params.id;
    }
  }

  ngOnInit() {
    this.getBill();
  }

  getBill() {
    console.log(this.billId);
    this.billService.getBill(this.billId).subscribe((bill: Bill) => {
      if (bill) {
        this.bill = bill;
      }
    });
  }

  acceptBill() {

  }

  denyBill() {

  }
}
