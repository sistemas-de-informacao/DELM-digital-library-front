import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Models
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  criar(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:8080/base-back-end/servicos/user/', user, { responseType: 'text' as 'json' });
  }

  listar(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/base-back-end/servicos/user/');
  }

}
