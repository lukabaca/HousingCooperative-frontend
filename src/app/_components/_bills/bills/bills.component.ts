import { Component, OnInit } from '@angular/core';
import {BillService} from '../../../_services/bill.service';
import {Measurement} from '../../../_models/measurement';
import {MatTableDataSource} from '@angular/material';
import {DataTableConfigurator} from '../../../_helpers/dataTableConfigurator';
import {Router} from '@angular/router';
import {Bill} from '../../../_models/bill';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent extends DataTableConfigurator implements OnInit {
  bills: Bill[];
  columnKeys: string[] = ['id', 'measurement.month', 'measurement.year', 'measurement.premise.number', 'accepted', 'checked', 'paid', 'pdf'];
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
    this.billService.getBills().subscribe((bills: Bill[]) => {
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

  test(element, event) {
    if (!element) {
      return;
    }
    event.stopPropagation();
    this.billService.getBillPdf(element.id).subscribe(res => {
      console.log(res);
      const blob = new Blob([res], {type: 'application/pdf'});
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'bill.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}
