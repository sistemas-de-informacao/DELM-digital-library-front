import { Injectable } from '@angular/core';

// Models
import { User } from './../models/user';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor() { }

  setId(user: User) {
    localStorage.setItem('id-user', user.id.toString());
  }

  getId(): string {
    return localStorage.getItem('id-user');
  }

  removeId(): void {
    localStorage.removeItem('id-user');
  }

  setPermissao(user: User): void {
    localStorage.setItem('user-type', user.tipo);
  }

  getPermissao(): string {
    return localStorage.getItem('user-type');
  }

  removePermissao(): void {
    localStorage.removeItem('user-type');
  }

}
