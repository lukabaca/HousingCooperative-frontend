import {ViewChild} from '@angular/core';
import {MatPaginator, MatSort, PageEvent} from '@angular/material';

export abstract class DataTableConfigurator {
  @ViewChild(MatPaginator) protected paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  protected dataSource: any;
  protected length = 100;
  protected pageSize = 10;
  protected pageSizeOptions: number[] = [10, 20, 50, 100];
  protected pageEvent: PageEvent;
}
