import { Validacoes } from './../../../validations/validations';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

// Models
import { User } from '../../../models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user: User;

  userFormGroup: FormGroup;
  changePasswordFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario() {
    this.userService.get().subscribe((user: User) => {
      this.user = user;
      this.criarForms();
    });
  }

  criarForms() {
    this.userFormGroup = this.fb.group({
      nickname: [this.user.nickname, [Validators.required, Validators.minLength(5)]],
      nome: [this.user.nome, [Validators.required, Validators.minLength(5)]],
      email: [this.user.email, [Validators.required, Validators.minLength(5), Validators.email]],
      enable: [this.user.enable, []]
    });

    this.changePasswordFormGroup = this.fb.group({
      senhaAntiga: [null, [Validators.required, Validators.minLength(5)]],
      senhaNova: [null, [Validators.required, Validators.minLength(5), Validacoes.senhasCombinam]],
      senhaNovaConfirmar: [null, [Validators.required, Validators.minLength(5), Validacoes.senhasCombinam]]
    });
  }

  onSubmitToEdit() {
    this.editar();
  }

  onSubmitToChangePassword() {
    console.log(this.changePasswordFormGroup.value);
  }

  editar() {
    this.userService.editar(new User(this.user.id, this.userFormGroup.get('nickname').value, this.userFormGroup.get('nome').value, this.userFormGroup.get('email').value, this.user.senha,
      this.user.saldo, this.user.dataCriacao, this.userFormGroup.get('enable').value)).subscribe((res: any) => {
        console.log(res);
      });
  }

}
