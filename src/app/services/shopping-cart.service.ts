import { Cart } from './../models/cart';
import { Game } from 'src/app/models/game';
import { LocalStorageService } from './local-storage.service';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paths } from 'src/assets/paths/Paths';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

declare const _: any;

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {

  selecionados: Array<Game> = [];

  qtdSelecionados: EventEmitter<number> = new EventEmitter();
  qtd: number;

  constructor(private localStorageService: LocalStorageService, private http: HttpClient) { }

  adicionarJogoLocalStorage(jogo: Game) {
    if (this.localStorageService.getItensSelecionados() !== null) {
      this.selecionados = this.localStorageService.getItensSelecionados();
      if (!this.selecionados.includes(jogo)) {
        this.selecionados.push(jogo);
      }
    } else {
      this.selecionados = [];
      this.selecionados.push(jogo);
    }

    this.localStorageService.setItensSelecionados(this.selecionados);
  }

  existeNaSacola(jogo: Game) {
    this.selecionados = this.localStorageService.getItensSelecionados();
    if (this.selecionados) {
      if (this.selecionados.filter(e => e.id === jogo.id).length > 0) {
        return true;
      }
    }

    return false;
  }

  removerDaSacola(jogo: Game) {
    const index = _.findIndex(this.localStorageService.getItensSelecionados(), jogo);
    this.selecionados = this.localStorageService.getItensSelecionados();
    this.selecionados.splice(index, 1);
    this.localStorageService.setItensSelecionados(this.selecionados);
  }

  getQuantidadeSelecionados(): number {
    return this.localStorageService.getItensSelecionados().length;
  }

  atualizarSacola() {
    this.qtdSelecionados.emit(this.qtd = this.localStorageService.getItensSelecionados() != null
      ? this.localStorageService.getItensSelecionados().length
      : 0);
  }

  isExistemJogosSelecionados(): boolean {
    if (this.localStorageService.getItensSelecionados()) {
      if (this.localStorageService.getItensSelecionados().length > 0) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  }

  listar(): Game[] {
    return this.localStorageService.getItensSelecionados();
  }

  finalizarCompra(cart: Cart): Observable<any> {
    this.esvaziarLixeira();
    this.atualizarSacola();
    return this.http.post<any>(`${environment.base_path}${Paths.BUY}`, cart);
  }

  esvaziarLixeira() {
    this.localStorageService.removeItensSelecionados();
  }

}


