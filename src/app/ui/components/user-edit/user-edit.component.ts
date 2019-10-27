import { Validacoes } from './../../../validations/validations';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

// Models
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user: User = new User(1, 'HNT3dev', 'Edson Camargo', 'dinhocmenezes@hotmail.com', 'jbdasjdbasjdasda', 10000, new Date());

  userFormGroup: FormGroup;
  changePasswordFormGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.criarForms();
  }

  criarForms() {
    this.userFormGroup = this.fb.group({
      nickname: [this.user.nickname, [Validators.required, Validators.minLength(5)]],
      nome: [this.user.nome, [Validators.required, Validators.minLength(5)]],
      email: [this.user.email, [Validators.required, Validators.minLength(5), Validators.email]]
    });

    this.changePasswordFormGroup = this.fb.group({
      senhaAntiga: [null, [Validators.required, Validators.minLength(5)]],
      senhaNova: [null, [Validators.required, Validators.minLength(5), Validacoes.senhasCombinam]],
      senhaNovaConfirmar: [null, [Validators.required, Validators.minLength(5), Validacoes.senhasCombinam]]
    });
  }

  onSubmitToEdit() {
    this.user.deserialize(this.userFormGroup);
  }

  onSubmitToChangePassword() {
    console.log(this.changePasswordFormGroup.value);
  }

}
