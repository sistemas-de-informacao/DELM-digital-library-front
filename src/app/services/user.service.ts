import { LocalStorageService } from './local-storage.service';
import { Paths } from './../../assets/paths/Paths';
import { environment } from './../../environments/environment';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Models
import { ICrud } from './../models/interfaces/ICrud';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService implements ICrud<User> {

  getNickname: EventEmitter<string> = new EventEmitter();

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

  deletar(id: number): Observable<any> {
    return null;
  }

  getPorId(id: number): Observable<any> {
    return this.http.get<any>(`${environment.base_path}${Paths.USERS}${id}`);
  }


  get(): Observable<any> {
    const id = this.localStorageService.getId();
    return this.http.get<any>(`${environment.base_path}${Paths.USERS}${id}`);
  }

  toggle() {
    if (this.localStorageService.getId()) {
      this.get().subscribe((user: User) => {
        this.getNickname.emit(user.nickname);
      });
    }
  }


}
