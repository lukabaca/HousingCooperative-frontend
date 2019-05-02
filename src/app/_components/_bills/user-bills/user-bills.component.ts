import { Component, OnInit } from '@angular/core';
import {BillService} from '../../../_services/bill.service';
import {Measurement} from '../../../_models/measurement';
import {MatTableDataSource} from '@angular/material';
import {DataTableConfigurator} from '../../../_helpers/dataTableConfigurator';
import {Router} from '@angular/router';
import {Bill} from '../../../_models/bill';

@Component({
  selector: 'app-user-bills',
  templateUrl: './user-bills.component.html',
  styleUrls: ['./user-bills.component.scss']
})
export class UserBillsComponent extends DataTableConfigurator implements OnInit {
  bills: Bill[];
  columnKeys: string[] = ['id', 'electricityCost', 'hotWaterCost', 'coldWaterCost', 'heatingCost', 'accepted', 'checked', 'paid'];
  isLoading: boolean;
  constructor(private billService: BillService,
              private router: Router) {
    super();
    this.isLoading = true;
  }

  ngOnInit() {
    this.getBills();
  }

  getBills() {
    this.billService.getUserBills().subscribe((bills: Bill[]) => {
      this.bills = bills;
      this.dataSource = new MatTableDataSource<Bill>(this.bills);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  billDetails(element, event) {
    if (!element) {
      return;
    }
    this.router.navigate(['bills', element.id]);
  }
}
