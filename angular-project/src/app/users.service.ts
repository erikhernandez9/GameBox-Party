import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpClient = inject(HttpClient);
  private baseURl: string;

  constructor() {
    this.baseURl = 'http://localhost:8080';
  }

  register(formValue: any){
    return firstValueFrom(
      this.httpClient.post('${this.baseURl}/api/auth/register', formValue)
    )
  }

  login(formValue: any){
    return firstValueFrom(
      this.httpClient.post('${this.baseURl}/api/auth/login', formValue)
    )
  }
}
