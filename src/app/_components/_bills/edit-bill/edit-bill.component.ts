import { Component, OnInit } from '@angular/core';
import {BillService} from '../../../_services/bill.service';
import {ActivatedRoute} from '@angular/router';
import {Bill} from '../../../_models/bill';
import {SnackBarGenerator} from '../../../_helpers/snackBarGenerator';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.scss']
})
export class EditBillComponent implements OnInit {

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
    this.billService.getBill(this.billId).subscribe((bill: Bill) => {
        if (bill) {
          this.bill = bill;
        }
    });
  }

  onSubmit(billForm) {
    this.billService.updateBill(this.bill).subscribe(res => {
      this.snackBar.openSnackBar('Poprawnie zaktualizowano rachunek', true);
      this.getBill();
    });
  }
}
