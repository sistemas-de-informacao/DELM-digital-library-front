import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// Models
import { Game } from './../../../../models/game';
import { GameCadastreForm } from './../../../../models/forms/game-form';

// Services
import { GameService } from './../../../../services/game.service';
import { DateService } from './../../../../services/date.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.scss']
})

export class GameEditComponent implements OnInit {

  game: Game;
  id: number;

  gameForm: GameCadastreForm;
  gameFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private gameService: GameService, private alertService: AlertService) { }

  ngOnInit() {
    this.getGame();
  }

  getGame() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.id = queryParams.id;
      this.gameService.getPorId(this.id).subscribe((game: Game) => {
        this.game = game;
        this.game.dataLancamento = DateService.converterDataComIfen(this.game.dataLancamento);
        this.criarForms();
      });
    });
  }

  criarForms() {
    this.gameFormGroup = this.fb.group({
      nome: [this.game.nome, [Validators.required, Validators.maxLength(120)]],
      preco: [this.game.preco, [Validators.required]],
      dataLancamento: [this.game.dataLancamento, [Validators.required]],
      desenvolvedor: [this.game.desenvolvedor, [Validators.required, Validators.maxLength(45)]],
      descricao: [this.game.descricao, [Validators.required, Validators.minLength(6), Validators.maxLength(500)]],
      categoria: [this.game.idCategoria, [Validators.required]]
    });
  }

  onSubmitToEdit() {
    this.gameForm = new GameCadastreForm(this.gameFormGroup);
    this.editar();
  }

  editar() {
    this.game = new Game(this.gameForm.nome, this.gameForm.preco, DateService.converterData(this.gameForm.dataLancamento), this.gameForm.desenvolvedor, this.gameForm.descricao, 1, undefined, this.id);
    this.gameService.editar(this.game).subscribe((res: any) => {
      if (res.includes('sucesso')) {
        this.alertService.success('Jogo atualizado com sucesso');
      } else {
        this.alertService.danger('Ocorreu algum problema, tente novamente.');
      }
    }, () => this.alertService.danger('Ocorreu algum problema, tente novamente.'));
  }
}
