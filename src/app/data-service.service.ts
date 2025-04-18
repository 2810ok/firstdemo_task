import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }
  getApi1(): Observable<any> {
    const url = 'https://jsonplaceholder.typicode.com/users';
    return this.http.get(url);
  }

  getApi2(): Observable<any> {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    return this.http.get(url);
  }


}