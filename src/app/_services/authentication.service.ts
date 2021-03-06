import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, config, Observable} from 'rxjs';
import {User} from '../_models/user';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Token} from '../_models/token';
import {Role} from '../_models/role';
import {RegistrationRequest} from '../_models/_requests/registrationRequest';
import {ApiResponse} from '../_models/apiResponse';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private apiUrl = environment.apiUrl + 'auth/';
  private token: Token;

  constructor(private http: HttpClient) {
  }

  getRoles(): Observable<Role[]> {
    const endpoint = this.apiUrl + 'roles';
    return this.http.get<Role[]>(endpoint);
  }

  getUsers(roleId = null): Observable<User[]> {
    let endpoint = this.apiUrl;
    if (roleId != null) {
      endpoint = endpoint + `users?roleId=${roleId}`;
    } else {
      endpoint = endpoint + 'users';
    }
    return this.http.get<User[]>(endpoint);
  }

  getUser(userId): Observable<User> {
    const endpoint = this.apiUrl + 'user/' + userId;
    return this.http.get<User>(endpoint).pipe(map(user => {
      if (user) {
        user.roleId = user.role.id;
        user.userInfo.birthDate = new Date(user.userInfo.birthDate);
        return user;
      }
      return null;
    }));
  }

  addUser(user: User): Observable<ApiResponse> {
    const endpoint = this.apiUrl + 'register';
    const registrationBody = new RegistrationRequest();
    registrationBody.birthDate = user.userInfo.birthDate;
    registrationBody.email = user.email;
    registrationBody.name = user.userInfo.name;
    registrationBody.password = user.password;
    registrationBody.roleId = user.roleId;
    registrationBody.surname = user.userInfo.surname;
    return this.http.post<ApiResponse>(endpoint, registrationBody);
  }

  editUser(user: User): Observable<Response> {
    const endpoint = this.apiUrl + 'user/' + user.id;
    const registrationBody = new RegistrationRequest();
    registrationBody.birthDate = user.userInfo.birthDate;
    registrationBody.email = user.email;
    registrationBody.name = user.userInfo.name;
    registrationBody.password = user.password;
    registrationBody.roleId = user.roleId;
    registrationBody.surname = user.userInfo.surname;
    return this.http.put<Response>(endpoint, registrationBody);
  }

  getUserData(): Observable<User> {
    const endpoint = this.apiUrl + 'userData';
    return this.http.get<User>(endpoint);
  }

  sendActivationToken(userId) {
    const endpoint = this.apiUrl + `sendActivationToken/${userId}`;
    return this.http.post(endpoint, null);
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
    const endpoint = this.apiUrl + 'login';
    const password = user.password;
    const email = user.email;
    return this.http.post<any>(endpoint, { email, password })
      .pipe(map(token => {
        if (token && token.token) {
          localStorage.setItem('token', JSON.stringify(token));
          this.token = token;
          this.getUserData().subscribe((loggedUser: User) => {
            if (loggedUser) {
              localStorage.setItem('currentUser', JSON.stringify(loggedUser));
              return loggedUser;
            }
            return null;
          });
          return null;
        }
      }));
  }

  logout() {
    if (localStorage.getItem('token') != null) {
      localStorage.removeItem('token');
    }
    if (localStorage.getItem('currentUser') != null) {
      localStorage.removeItem('currentUser');
    }
  }
}
