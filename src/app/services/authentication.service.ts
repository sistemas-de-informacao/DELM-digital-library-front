import { Injectable } from '@angular/core';

// Models
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const userType = 1;

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private router: Router, private http: HttpClient) { }

  onLogin(credentials: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/base-back-end/servicos/user/login', credentials);
  }

}
