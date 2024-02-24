import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorResponseService } from './utils/error-response.service';
import { HeadersService } from './utils/headers.service';
import { Observable, catchError} from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private errorResponseService: ErrorResponseService,
    private headersService: HeadersService
  ) { }

  validateUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/validate`, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/users`, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/users/${id}`, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }

  deleteUserById(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/users/${id}`, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }

  updateUserById(id: string, formData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/users/${id}`, formData, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }
}
