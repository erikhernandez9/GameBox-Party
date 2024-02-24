import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorResponseService } from './utils/error-response.service';
import { HeadersService } from './utils/headers.service';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private errorResponseService: ErrorResponseService,
    private headersService: HeadersService
  ) { }

  getRoomById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/rooms/${id}`, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }

  connectRoom(id : string, username : string): Observable<any> {
    return this.http.post(`${this.apiUrl}/rooms/connect/${id}`, { username : username }, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }

  startRoom(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/rooms/start/${id}`, {}, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }

  createRoom(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/rooms`, formData, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }

  voteRoom(id: string, activityId: string, vote: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/rooms/vote/${id}`, { activityId : activityId, vote: vote }, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }

  getRoomVotes(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/rooms/vote/${id}`, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }
}
