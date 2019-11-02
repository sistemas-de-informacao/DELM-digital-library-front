import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

// Models
import { GameCadastreForm } from '../../../../models/forms/game-form';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-game-cadastre',
  templateUrl: './game-cadastre.component.html',
  styleUrls: ['./game-cadastre.component.scss']
})
export class GameCadastreComponent implements OnInit {

  gameForm: GameCadastreForm;
  game: Game;

  loginFormGroup = this.fb.group({
    nome: [null, [Validators.required, Validators.minLength(5)]],
    preco: [null, [Validators.required]],
    dataLancamento: [null, [Validators.required]],
    desenvolvedor: [null, [Validators.required, Validators.minLength(6)]],
    descricao: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(300)]],
    categoria: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder, private gameService: GameService) { }

  ngOnInit() {
  }

  onSubmitCriarJogo() {
    this.gameForm = new GameCadastreForm(this.loginFormGroup);
    this.criarJogo();
  }

  criarJogo() {
    this.game = new Game(this.gameForm.nome, this.gameForm.preco, DateService.converterData(this.gameForm.dataLancamento), this.gameForm.desenvolvedor, this.gameForm.descricao, 1);
    this.gameService.criar(this.game).subscribe((res: any) => {
      console.log(res);
    })
  }

}
