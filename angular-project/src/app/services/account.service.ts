import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorResponseService } from './utils/error-response.service';
import { HeadersService } from './utils/headers.service';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private errorResponseService: ErrorResponseService,
    private headersService: HeadersService
  ) { }

  deleteUserById(id: string, password: string): Observable<any> {
    const options = {
      headers: this.headersService.createHeaders(),
      body: { password: password }
    };

    return this.http.delete(`${this.apiUrl}/account/${id}`, options).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }

  updateUserById(id: string, formData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/account/${id}`, formData, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }
}
