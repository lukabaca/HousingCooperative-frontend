import { Component, OnInit } from '@angular/core';
import {AuthGuard} from '../../../_guards/auth.guard';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor(private authGuard: AuthGuard) { }

  ngOnInit() {
    // this.authGuard.hasRole(['ROLE_USER', 'ROLE_ADMIN']);
  }


}
