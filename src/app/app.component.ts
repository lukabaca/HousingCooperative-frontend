import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './_services/authentication.service';
import {User} from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'front';

  constructor(private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    const test = this.authenticationService.getUsers().subscribe((users: User[]) => {
        console.log(users);
    });
  }

}
