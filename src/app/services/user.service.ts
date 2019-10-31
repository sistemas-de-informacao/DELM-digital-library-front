import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Models
import { UserCadastreForm } from '../models/forms/user-cadastre-form';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  criar(user: UserCadastreForm): Observable<User> {
    return this.http.post<User>('http://localhost:8080/base-back-end/servicos/user/', user);
  }

}
