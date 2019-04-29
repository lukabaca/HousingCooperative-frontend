import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Premise} from '../_models/premise';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PremisesService {
  private apiUrl = environment.apiUrl + 'premise/';

  constructor(private http: HttpClient) {

  }

  getPremise(premiseId): Observable<Premise> {
    const endpoint = this.apiUrl + 'premise/{id}?id=' + premiseId;
    return this.http.get<Premise>(endpoint);
  }

  addPremise(premise: Premise): Observable<Response> {
    const endpoint = this.apiUrl + 'premise';
    return this.http.post<Response>(endpoint, premise);
  }

  editPremise(premise: Premise): Observable<Response> {
    const endpoint = this.apiUrl + 'premise/{id}?id=' + premise.id;
    return this.http.put<Response>(endpoint, premise);
  }

  deletePremise(premise: Premise): Observable<any> {
    const endpoint = this.apiUrl + 'premise/{id}?id=' + premise.id;
    return this.http.delete<any>(endpoint);
  }
}
