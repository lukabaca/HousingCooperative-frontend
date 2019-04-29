import {ViewChild} from '@angular/core';
import {MatPaginator, MatSort, PageEvent} from '@angular/material';

export abstract class DataTableConfigurator {
  @ViewChild(MatPaginator) protected paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: any;
  public length = 100;
  public pageSize = 10;
  public pageSizeOptions: number[] = [10, 20, 50, 100];
  public pageEvent: PageEvent;
}
