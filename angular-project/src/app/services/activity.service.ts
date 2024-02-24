import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorResponseService } from './utils/error-response.service';
import { HeadersService } from './utils/headers.service';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private apiUrl: string = environment.apiUrl;
  activities: any = [];

  constructor(
    private http: HttpClient,
    private errorResponseService: ErrorResponseService,
    private headersService: HeadersService
  ) { }

  getActivities(): Observable<any> {
    return this.http.get(`${this.apiUrl}/activities`, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    )
  }

  getActivityById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/activities/${id}`, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }

  createActivity(formData: any): Observable<any> {

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('description', formData.description);
    formDataObj.append('image', formData.image);

    return this.http.post(`${this.apiUrl}/admin/activities`, formDataObj, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }

  deleteActivityById(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/activities/${id}`, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }

  updateActivityById(id: string, formData: any): Observable<any> {

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('description', formData.description);
    formDataObj.append('image', formData.image);

    return this.http.put(`${this.apiUrl}/admin/activities/${id}`, formDataObj, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }
}
