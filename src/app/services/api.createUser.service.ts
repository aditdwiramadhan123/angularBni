import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataSend } from './users.type';

@Injectable({
  providedIn: 'root'
})
export class createUser {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // Endpoint untuk posting data user

  constructor(private http: HttpClient) { }

  createUser(userData: DataSend): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }
}


