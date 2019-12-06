import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.scss']
})
export class AllGamesComponent implements OnInit {

  games: Game[] = [];

  currentUrl: string;

  constructor(private router: Router, private gameService: GameService) { }

  ngOnInit() {
    this.listar();
    this.currentUrl = this.router.url;
  }

  irParaEditarJogo(id: number) {
    this.router.navigate(['dashboard/editar-jogo/jogo'], { queryParams: { id } });
  }

  listar() {
    this.gameService.listar(-2).subscribe((games: Game[]) => {
      if (games) {
        this.games = games;
      }
    });
  }

}
