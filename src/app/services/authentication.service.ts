import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Models
import { User } from './../models/user';
import { Paths } from './../../assets/paths/Paths';
import { environment } from './../../environments/environment';

// Services
import { LocalStorageService } from './local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private router: Router, private http: HttpClient, private localStorageService: LocalStorageService, private shoppingCartService: ShoppingCartService) { }

  static nickname: string;

  onLogin(credentials: any): Observable<any> {
    return this.http.post<any>(`${environment.base_path}${Paths.USERS}${Paths.LOGIN}`, credentials);
  }

  entrar(user: User) {
    this.localStorageService.setId(user);
    this.localStorageService.setPermissao(user);
    const id = this.localStorageService.getId();
    this.router.navigate(['/loja/biblioteca'], { queryParams: { id } });
  }

  isLogado(): boolean {
    if (this.localStorageService.getId()) {
      return true;
    } else {
      return false;
    }
  }

  isAdministrador(): boolean {
    return this.localStorageService.getPermissao() === 'ADMINISTRADOR';
  }

  sair() {
    this.localStorageService.removeId();
    this.localStorageService.removePermissao();
    this.localStorageService.removeItensSelecionados();
    this.shoppingCartService.atualizarSacola();
  }

}
