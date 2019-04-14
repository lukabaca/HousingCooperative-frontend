import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, config, Observable} from 'rxjs';
import {User} from '../_models/user';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Token} from '../_models/token';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private apiUrl = environment.apiUrl + 'auth';
  private currentLoggedUser: User;
  private token: Token;

  constructor(private http: HttpClient) {
    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  getUsers(): Observable<User[]> {
    const endpoint = this.apiUrl + '/users';
    return this.http.get<User[]>(endpoint);
  }

  getUserData(): Observable<User> {
    const endpoint = this.apiUrl + '/userData';
    return this.http.get<User>(endpoint);
  }

  public isUserLoggedIn(): boolean {
    return (localStorage.getItem('currentUser') != null && localStorage.getItem('token') != null);
  }

  public getCurrentLoggedUser(): User {
    if (localStorage.getItem('currentUser') != null) {
      return JSON.parse(localStorage.getItem('currentUser'));
    }
    return null;
  }

  public getLoggedUserToken(): Token {
    if (localStorage.getItem('token') != null) {
      return JSON.parse(localStorage.getItem('token'));
    }
    return null;
  }

  login(user: User) {
    const endpoint = this.apiUrl + '/login';
    const password = user.password;
    const email = user.email;
    return this.http.post<any>(endpoint, { email, password })
      .pipe(map(token => {
        // login successful if there's a jwt token in the response
        if (token && token.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', JSON.stringify(token));
          this.token = token;
          this.getUserData().subscribe((loggedUser: User) => {
            if (loggedUser) {
              localStorage.setItem('currentUser', JSON.stringify(loggedUser));
              return loggedUser;
            }
            return null;
          });
          // this.currentUserSubject.next(user);
          return null;
        }
      }));
  }

  logout() {
    // remove user from local storage to log user out
    if (localStorage.getItem('token') != null) {
      localStorage.removeItem('token');
    }
    if (localStorage.getItem('currentUser') != null) {
      localStorage.removeItem('currentUser');
    }
    // this.currentUserSubject.next(null);
  }
}
