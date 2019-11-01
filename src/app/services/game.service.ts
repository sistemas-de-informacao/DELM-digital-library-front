import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  converterNomeParaUrl(nome: string) {
    return nome.replace(' ', '-');
  }

  criar(jogo: Game): Observable<any> {
    return this.http.post('http://localhost:8080/base-back-end/servicos/games/', jogo, { responseType: 'text' as 'json' })
  }

}
