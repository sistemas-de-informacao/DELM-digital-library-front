import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

// Models
import { Game } from './../../../models/game';
import { GameService } from 'src/app/services/game.service';
// import { GAMES } from './../../../mocks/games-mock';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})

export class GameDetailsComponent implements OnInit, OnDestroy {

  inscricao: Subscription;

  id: number;
  jogo: Game;

  constructor(private route: ActivatedRoute, private gameServices: GameService) { }

  ngOnInit() {
    this.inscricao = this.route.queryParams.subscribe((queryParams: any) => {
      this.id = queryParams.id;
      this.gameServices.getPorId(this.id).subscribe((game: Game) => {
        this.jogo = game;
      })
    });
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

}
