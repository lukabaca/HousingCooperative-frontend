import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {User} from '../_models/user';
import {Token} from '../_models/token';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Building} from '../_models/building';
import {HousingCooperative} from '../_models/housingCooperative';

@Injectable({ providedIn: 'root' })
export class HousingCooperativeService {
  private apiUrl = environment.apiUrl + 'housingCooperative/';
  private currentLoggedUser: User;
  private token: Token;

  constructor(private http: HttpClient) {

  }

  public getHousingCooperative(): Observable<HousingCooperative> {
    const housingCooperativeId = 1;
    const endpoint = this.apiUrl + "housingCooperative/{id}?id=" + housingCooperativeId;
    return this.http.get<HousingCooperative>(endpoint);
  }

  public getBuildings(): Observable<Building[]> {
    const endpoint = this.apiUrl + "buildings";
    return this.http.get<Building[]>(endpoint);
  }

  public addBuilding(building: Building): Observable<Response> {
    const endpoint = this.apiUrl + "building";
    return this.http.post<Response>(endpoint, building);
  }

  public editBuilding(building: Building): Observable<Response> {
    const endpoint = this.apiUrl + "building/{id}?id=" + building.id;
    return this.http.put<Response>(endpoint, building);
  }

}
