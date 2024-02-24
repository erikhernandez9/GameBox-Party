import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorResponseService {

  private errorResponse: string = '';

  setErrorResponse(error: string): void {
    this.errorResponse = error;
  }

  getErrorResponse(): any {
    return this.errorResponse;
  }
  
}
