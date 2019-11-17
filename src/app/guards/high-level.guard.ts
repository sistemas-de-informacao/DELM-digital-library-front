import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

// Services
import { LocalStorageService } from './../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HighLevelGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.localStorageService.getPermissao() === 'ADMINISTRADOR' && this.localStorageService.getId() != null;
  }

}
