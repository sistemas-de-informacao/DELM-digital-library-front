import { GameCadastreForm } from './../../../../models/forms/game-form';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

// Models
import { Game } from './../../../../models/game';

// Services
import { GameService } from './../../../../services/game.service';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.scss']
})

export class GameEditComponent implements OnInit {

  game: Game;

  gameFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private gameService: GameService) { }

  ngOnInit() {
    this.getGame();
    this.criarForms();
  }

  getGame() {
    // this.gameService.getPorId().subscribe((game: Game) => {
    //   this.game = game;
    //   this.criarForms();
    // });
  }

  criarForms() {
    this.gameFormGroup = this.fb.group({
      nome: [null, [Validators.required, Validators.maxLength(120)]],
      preco: [null, [Validators.required, Validators.pattern('[0-9]+$')]],
      dataLancamento: [null, [Validators.required]],
      desenvolvedor: [null, [Validators.required, Validators.minLength(45)]],
      descricao: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(500)]],
      categoria: [null, [Validators.required]]
    });
  }

  onSubmitToEdit() {
    this.editar();
  }

  editar() {
    // this.gameService.editar(new game(this.game.id, this.gameFormGroup.get('nickname').value, this.gameFormGroup.get('nome').value, this.gameFormGroup.get('email').value, this.game.senha,
    //   this.game.saldo, this.game.dataCriacao, this.gameFormGroup.get('enable').value)).subscribe((res: any) => {
    //     console.log(res);
    //   });
  }
}
