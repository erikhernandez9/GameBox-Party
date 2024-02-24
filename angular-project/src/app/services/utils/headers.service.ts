import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

  constructor(private localStorageService: LocalStorageService) { }

  createHeaders(): HttpHeaders {
    const token = this.localStorageService.getToken();
    return new HttpHeaders({
      'x-access-token': token || ''
    });
  }
}
