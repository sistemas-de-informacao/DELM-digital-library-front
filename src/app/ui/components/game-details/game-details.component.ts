import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

// Models
import { Game } from './../../../models/game';
import { GAMES } from './../../../mocks/games-mock';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})

export class GameDetailsComponent implements OnInit, OnDestroy {

  inscricao: Subscription;

  id: number;
  jogo: Game;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.inscricao = this.route.queryParams.subscribe((queryParams: any) => {
      this.id = queryParams.id as number;
      for (const jogo of GAMES) {
        if (jogo.id == this.id) {
          this.jogo = jogo;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

}
