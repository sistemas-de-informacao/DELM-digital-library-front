import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

// Models
import { GameCadastreForm } from '../../../../models/forms/game-form';

@Component({
  selector: 'app-game-cadastre',
  templateUrl: './game-cadastre.component.html',
  styleUrls: ['./game-cadastre.component.scss']
})
export class GameCadastreComponent implements OnInit {

  gameForm: GameCadastreForm;

  loginFormGroup = this.fb.group({
    nome: [null, [Validators.required, Validators.minLength(5)]],
    preco: [null, [Validators.required]],
    dataLancamento: [null, [Validators.required]],
    desenvolvedor: [null, [Validators.required, Validators.minLength(6)]],
    descricao: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(300)]],
    categoria: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmitToCreateGame() {
    this.gameForm = new GameCadastreForm(this.loginFormGroup);
    console.log(this.gameForm);
  }

}
