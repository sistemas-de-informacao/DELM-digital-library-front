import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Models
import { ICrud } from './../models/interfaces/ICrud';
import { Game } from '../models/game';
import { Paths } from './../../assets/paths/Paths';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GameService implements ICrud<Game> {

  constructor(private http: HttpClient) { }

  converterNomeParaUrl(nome: string) {
    return nome.replace(' ', '-');
  }

  criar(jogo: Game): Observable<any> {
    return this.http.post(`${environment.base_path}${Paths.GAMES}`, jogo);
  }

  listar(id = -1): Observable<Game[]> {
    return this.http.get<Game[]>(`${environment.base_path}${Paths.GAMES}delm/${id}`);
  }

  editar(jogo: Game): Observable<any> {
    return this.http.put<Game>(`${environment.base_path}${Paths.GAMES}`, jogo);
  }

  editarPorNome(jogo: Game): Observable<any> {
    return this.http.put<Game>(`${environment.base_path}${Paths.GAMES}${Paths.IMAGE}`, jogo);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.base_path}${Paths.GAMES}${id}`, { responseType: 'text' as 'json' });
  }

  getPorId(id: number): Observable<Game> {
    return this.http.get<Game>(`${environment.base_path}${Paths.GAMES}${id}`);
  }

  getPorNome(nome: string): Observable<any> {
    return this.http.get<any>(`${environment.base_path}${Paths.GAMES}${Paths.SEARCH}${nome}`);
  }

  hasJogo(game: number, usuario: number): Observable<any> {
    return this.http.get<any>(`${environment.base_path}${Paths.GAMES}${Paths.HAS_GAME}${game}/${usuario}`);
  }

}
