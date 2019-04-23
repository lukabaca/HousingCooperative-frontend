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

  addPremise(premise: Premise): Observable<Response> {
    const endpoint = this.apiUrl + "premise";
    return this.http.post<Response>(endpoint, premise);
  }
}
