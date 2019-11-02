import { Injectable } from '@angular/core';

// Models
import { User } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setId(user: User) {
    console.log(user);
    localStorage.setItem('id-user', user.id.toString());
  }

  getId(): string {
    return localStorage.getItem('id-user');
  }

}
