import { LocalStorageService } from './local-storage.service';
import { Paths } from './../../assets/paths/Paths';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Models
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  criar(user: User): Observable<any> {
    return this.http.post<any>(`${environment.base_path}${Paths.USERS}`, user);
  }

  listar(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.base_path}${Paths.USERS}`);
  }

  editar(user: User): Observable<any> {
    return this.http.put<any>(`${environment.base_path}${Paths.USERS}`, user);
  }

  get(): Observable<any> {
    const id = this.localStorageService.getId();
    return this.http.get<any>(`${environment.base_path}${Paths.USERS}${id}`);
  }

  getPorId(id: string): Observable<any> {
    return this.http.get<any>(`${environment.base_path}${Paths.USERS}${id}`);
  }

}
