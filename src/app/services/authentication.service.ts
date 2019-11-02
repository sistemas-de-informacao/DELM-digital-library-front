import { Paths } from './../../assets/paths/Paths';
import { environment } from './../../environments/environment';
import { User } from 'src/app/models/user';
import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';

// Models
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private router: Router, private http: HttpClient, private localStorageService: LocalStorageService) { }

  onLogin(credentials: any): Observable<any> {
    return this.http.post<any>(`${environment.base_path}${Paths.USERS}${Paths.LOGIN}`, credentials);
  }

  entrar(user: User) {
    this.localStorageService.setId(user);
    const id = this.localStorageService.getId();
    this.router.navigate(['/loja/biblioteca'], { queryParams: { id } });
  }

}
