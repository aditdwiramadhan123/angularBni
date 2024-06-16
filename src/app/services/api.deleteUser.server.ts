import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class deleteUser {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // Endpoint untuk posting data user

  constructor(private http: HttpClient) {}

  deleteUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<any>(url);
  }
}
