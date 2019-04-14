import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {User} from '../_models/user';
import {Token} from '../_models/token';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Building} from '../_models/building';

@Injectable({ providedIn: 'root' })
export class HousingCooperativeService {
  private apiUrl = environment.apiUrl + 'housingCooperative/';
  private currentLoggedUser: User;
  private token: Token;

  constructor(private http: HttpClient) {

  }

  public getBuildings(): Observable<Building[]> {
    const endpoint = this.apiUrl + "buildings";
    return this.http.get<Building[]>(endpoint);
  }

  public addBuilding(building: Building): Observable<Response> {
    const endpoint = this.apiUrl + "building";
    return this.http.post<Response>(endpoint, building);
  }

}
