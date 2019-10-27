import { Game } from './../../../models/game';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})

export class GameListComponent implements OnInit {

  MOCK_GAME: Game[] = [];

  searchFormGroup = this.fb.group({
    name: [null]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    for (let index = 0; index < 3; index++) {
      this.MOCK_GAME.push(new Game('GTA', 32, new Date(), 'Ubisoft', 'Grand Theft Auto é uma série de jogos de computador e videogames criada por David Jones e Mike Dailly, sendo posteriormente gerenciada pelos irmãos Dan e Sam Houser, Leslie Benzies e Aaron Garbut. A maioria dos jogos foi desenvolvida pela Rockstar North e publicada pela Rockstar Games.', 1));
      console.log(this.MOCK_GAME)
    }
  }

}
