import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

// Models
import { Game } from './../../../models/game';
// import { GAMES } from '../../../mocks/games-mock';

// Services
import { GameService } from './../../../services/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})

export class GameListComponent implements OnInit {

  // MOCK_GAME = GAMES;

  games: Game[] = [];

  searchFormGroup = this.fb.group({
    nome: [null]
  });

  constructor(private fb: FormBuilder, private router: Router, private gameService: GameService) { }

  ngOnInit() {
    this.listar();
  }

  getJogo(id: number, nome: string) {
    this.router.navigate([`/loja/jogo/${this.gameService.converterNomeParaUrl(nome)}`], { queryParams: { id } });
  }

  listar() {
    this.gameService.listar().subscribe((games: Game[]) => {
      this.games = games;
    });
  }

}
