import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

// Models
import { User } from '../../../models/user';
import { UserService } from 'src/app/services/user.service';
import { Validacoes } from './../../../validations/validations';

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
      nickname: [this.user.nickname, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      nome: [this.user.nome, [Validators.required, Validators.maxLength(120)]],
      email: [this.user.email, [Validators.required, Validators.email, Validators.maxLength(150)]],
      enable: [this.user.enable, []]
    });

    this.changePasswordFormGroup = this.fb.group({
      senhaAntiga: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(70)]],
      senhaNova: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(70), Validacoes.senhasCombinam]],
      senhaNovaConfirmar: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(70), Validacoes.senhasCombinam]]
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
