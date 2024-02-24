import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './utils/local-storage.service';
import { Observable, catchError} from 'rxjs';
import { ErrorResponseService } from './utils/error-response.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private errorResponseService: ErrorResponseService
  ) { }

  signIn(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, formData).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }

  signUp(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, formData).pipe(
      catchError((error) => {
        this.errorResponseService.setErrorResponse(error.error.message);
        throw (error);
      })
    );
  }

  logOut(): void {
    this.localStorageService.removeToken();
    this.localStorageService.removeUser();
  }

  isAdmin(): boolean {
    const user = this.localStorageService.getUser();
    if (user) {
      return user.permissions.includes('admin');
    }
    return false;
  }

  isUser(): boolean {
    const user = this.localStorageService.getUser();
    if (user) {
      return user.permissions.includes('user');
    }
    return false;
  }
}
