import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { DataSend } from './users.type';

@Injectable({
  providedIn: 'root',
})
export class editUser {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // Endpoint untuk posting data user

  constructor(private http: HttpClient) {}

  // Method untuk mengupdate data user
  // updateUser(userId: number, userData:DataSend ): Observable<any> {
  //   const url = `${this.apiUrl}/${userId}`;
  //   return this.http.put<any>(url, userData);

    updateData(id: number, data: DataSend): Observable<DataSend> {
      return this.http.put<DataSend>(`${this.apiUrl}/${id}`, data).pipe(
        map((response) => response),
        catchError((error) => throwError(error))
      );
    }
  }

