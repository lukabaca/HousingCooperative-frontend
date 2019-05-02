import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from '../_models/bill';
import {BillPaymentStatusRequest} from '../_models/_requests/billPaymentStatusRequest';
import {StateAcceptedRequest} from '../_models/_requests/stateAcceptedRequest';

@Injectable({ providedIn: 'root' })
export class BillService {
  private apiUrl = environment.apiUrl + 'bill/';

  constructor(private http: HttpClient) {

  }

  getBill(billId): Observable<Bill> {
    const endpoint = this.apiUrl + `bill/${billId}`;
    return this.http.get<Bill>(endpoint);
  }

  getBills(): Observable<Bill[]> {
    const endpoint = this.apiUrl + 'bills';
    return this.http.get<Bill[]>(endpoint);
  }

  updateBill(bill: Bill): Observable<Response> {
    const endpoint = this.apiUrl + `bill/${bill.id}`;
    return this.http.put<Response>(endpoint, bill);
  }

  getUserBills(): Observable<Bill[]> {
    const endpoint = this.apiUrl + 'getUserBills';
    return this.http.get<Bill[]>(endpoint);
  }

  getBillPdf(billId) {
    const endpoint = this.apiUrl + `billPdf/${billId}`;
    return this.http.get(endpoint, {responseType: 'blob'});
  }

  changeBillPaymentStatus(billId, billPaymentStatusRequest: BillPaymentStatusRequest): Observable<Response> {
    const endpoint = this.apiUrl + `changeBillPaymentStatus/${billId}`;
    return this.http.put<Response>(endpoint, billPaymentStatusRequest);
  }

  changeBillStatus(billId, billStatusRequest: StateAcceptedRequest): Observable<Response> {
    const endpoint = this.apiUrl + `changeBillStatus/${billId}`;
    return this.http.put<Response>(endpoint, billStatusRequest);
  }
}
