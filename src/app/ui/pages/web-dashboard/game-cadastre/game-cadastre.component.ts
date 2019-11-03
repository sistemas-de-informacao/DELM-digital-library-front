import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

// Models
import { GameCadastreForm } from '../../../../models/forms/game-form';
import { Game } from 'src/app/models/game';

// Services
import { GameService } from 'src/app/services/game.service';
import { DateService } from 'src/app/services/date.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-game-cadastre',
  templateUrl: './game-cadastre.component.html',
  styleUrls: ['./game-cadastre.component.scss']
})
export class GameCadastreComponent implements OnInit {

  gameForm: GameCadastreForm;
  game: Game;

  gameFormGroup = this.fb.group({
    nome: [null, [Validators.required, Validators.maxLength(120)]],
    preco: [null, [Validators.required]],
    dataLancamento: [null, [Validators.required]],
    desenvolvedor: [null, [Validators.required, Validators.maxLength(45)]],
    descricao: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(500)]],
    categoria: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder, private gameService: GameService, private alertService: AlertService) { }

  ngOnInit() {
  }

  onSubmitCriarJogo() {
    this.gameForm = new GameCadastreForm(this.gameFormGroup);
    this.criarJogo();
  }

  criarJogo() {
    this.game = new Game(this.gameForm.nome, this.gameForm.preco, DateService.converterData(this.gameForm.dataLancamento), this.gameForm.desenvolvedor, this.gameForm.descricao, 1);
    this.gameService.criar(this.game).subscribe((res: any) => {
      if (res.includes('sucesso')) {
        this.gameForm = null;
        this.gameFormGroup.reset();
        this.alertService.success('Jogo cadastrado com sucesso.');
      } else {
        this.alertService.danger('Ocorreu algum problema, tente novamente.');
      }
    })
  }

}
