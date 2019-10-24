import { Injectable } from '@angular/core';

// Models
import { LoginForm } from '../models/login-form';
import { Router } from '@angular/router';

const userType = 1;

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private router: Router) { }

  onLogin(credentials: LoginForm) {
    if (credentials) {
      if (userType === 1) {
        this.router.navigateByUrl('dashboard');
      } else {
        this.router.navigateByUrl('home');
      }
    }
  }

}
