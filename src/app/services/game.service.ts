import { Paths } from './../../assets/paths/Paths';
import { environment } from './../../environments/environment';
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
    return this.http.post(`${environment.base_path}${Paths.GAMES}`, jogo, { responseType: 'text' as 'json' });
  }

  listar(): Observable<Game[]> {
    return this.http.get<Game[]>(`${environment.base_path}${Paths.GAMES}`);
  }

  getPorId(id: number): Observable<Game> {
    return this.http.get<Game>(`${environment.base_path}${Paths.GAMES}${id}`);
  }

}
