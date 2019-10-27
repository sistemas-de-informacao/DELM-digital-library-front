import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  converterNomeParaUrl(nome: string) {
    return nome.replace(' ', '-');
  }

}
