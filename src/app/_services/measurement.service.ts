import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Measurement} from '../_models/measurement';
import {StateAcceptedRequest} from '../_models/_requests/stateAcceptedRequest';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MeasurementService {
  private apiUrl = environment.apiUrl + 'measurement/';

  constructor(private http: HttpClient) {

  }

  getMeasurement(measurementId): Observable<Measurement> {
    const endpoint = this.apiUrl + `measurement/${measurementId}`;
    return this.http.get<Measurement>(endpoint);
  }

  getMeasurements(): Observable<Measurement[]> {
    const endpoint = this.apiUrl + 'measurements';
    return this.http.get<Measurement[]>(endpoint);
  }

  getUserMeasurements(): Observable<Measurement[]> {
    const endpoint = this.apiUrl + 'getUserMeasurements';
    return this.http.get<Measurement[]>(endpoint);
  }

  createMeasurement(measurement: Measurement): Observable<Response> {
    const endpoint = this.apiUrl + 'measurement';
    return this.http.post<Response>(endpoint, measurement).pipe(
      catchError((err: any) => {
        if (err && err instanceof HttpErrorResponse) {
          console.log('hhtp erorr:', err.status);
        }
        console.log('error status: ', err);
        return throwError('409');
      }));
  }

  updateMeasurement(measurement: Measurement): Observable<Response> {
    const endpoint = this.apiUrl + `measurement/${measurement.id}`;
    return this.http.put<Response>(endpoint, measurement);
  }

  changeMeasurementStatus(measurementId, measurementStatusRequest: StateAcceptedRequest): Observable<Response> {
    const endpoint = this.apiUrl + `changeMeasurementStatus/${measurementId}`;
    return this.http.put<Response>(endpoint, measurementStatusRequest);
  }

}
