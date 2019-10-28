import { Injectable } from '@angular/core';

// Models
import { Router } from '@angular/router';

const userType = 1;

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private router: Router) { }

  onLogin(credentials: any) {
    if (credentials) {
      if (userType === 1) {
        this.router.navigateByUrl('/loja/biblioteca');
      } else {
        this.router.navigateByUrl('/loja/biblioteca');
      }
    }
  }

}
