import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Models
import { Game } from '../models/game';
import { Paths } from './../../assets/paths/Paths';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GameService {

  constructor(private http: HttpClient) { }

  converterNomeParaUrl(nome: string) {
    return nome.replace(' ', '-');
  }

  criar(jogo: Game): Observable<any> {
    return this.http.post(`${environment.base_path}${Paths.GAMES}`, jogo);
  }

  listar(): Observable<Game[]> {
    return this.http.get<Game[]>(`${environment.base_path}${Paths.GAMES}`);
  }

  getPorId(id: number): Observable<Game> {
    return this.http.get<Game>(`${environment.base_path}${Paths.GAMES}${id}`);
  }

  editar(jogo: Game): Observable<any> {
    return this.http.put<Game>(`${environment.base_path}${Paths.GAMES}`, jogo);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.base_path}${Paths.GAMES}${id}`, { responseType: 'text' as 'json' });
  }

}
