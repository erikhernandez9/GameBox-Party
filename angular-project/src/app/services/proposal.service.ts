import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorResponseService } from './utils/error-response.service';
import { HeadersService } from './utils/headers.service';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private errorResponseService: ErrorResponseService,
    private headersService: HeadersService
  ) { }

  getProposals(): Observable<any> {
    return this.http.get(`${this.apiUrl}/proposals`, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }

  getProposalById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/proposals/${id}`, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }

  createProposal(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/proposals`, formData, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }


  //Admin exclusive
  deleteProposalById(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/proposals/${id}`, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }

  updateProposalById(id: string, formData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/proposals/${id}`, formData, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }

  //User exlusive
  getProposalByIdUser(userId: string, proposalId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/proposals/user/${userId}/${proposalId}`, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }

  getProposalsByIdUser(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/proposals/user/${userId}`, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }

  deleteProposalByIdUser(userId: string, proposalId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/proposals/user/${userId}/${proposalId}`, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }

  updateProposalByIdUser(userId: string, proposalId: string, formData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/proposals/user/${userId}/${proposalId}`, formData, { headers: this.headersService.createHeaders() }).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }
}
