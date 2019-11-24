import { UpdatePasswordForm } from './../../../models/forms/update-password-form';
import { Router } from '@angular/router';
import { ResponseDefault } from './../../../models/response-default';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

// Models
import { User } from '../../../models/user';
import { Validacoes } from './../../../validations/validations';

// Services
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user: User;

  userFormGroup: FormGroup;
  changePasswordFormGroup: FormGroup;

  loading = false;
  alterarSenhaLoading = false;

  senhas: UpdatePasswordForm;

  constructor(private fb: FormBuilder, private userService: UserService, private alertService: AlertService, private router: Router) { }

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
      enable: [this.user.enable === true ? false : true, []]
    });

    this.changePasswordFormGroup = this.fb.group({
      senhaAntiga: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(70)]],
      senhaNova: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(70)]],
      senhaNovaConfirmar: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(70)]]
    });
  }

  irParaHistorico(id: number) {
    this.router.navigate([`perfil/id/${this.user.nickname}/historico-de-compras`], { queryParams: { id } });
  }

  onSubmitToEdit() {
    this.editar();
  }

  onSubmitToChangePassword() {
    this.atualizarSenha();
  }

  mudarDesativarConta(): boolean {
    let enable: boolean;
    if (this.userFormGroup.get('enable').value === true) {
      return enable = false;
    } else {
      return enable = true;
    }
  }

  editar() {
    this.loading = true;
    this.userService.editar(new User(this.user.id, this.userFormGroup.get('nickname').value, this.userFormGroup.get('nome').value, this.userFormGroup.get('email').value, this.user.senha,
      this.user.saldo, this.user.dataCriacao, this.mudarDesativarConta())).subscribe((res: ResponseDefault<User>) => {
        if (res.body) {
          this.alertService.success(res.mensagem);
        } else {
          this.alertService.danger(res.mensagem);
        }

        this.loading = false;
      });
  }

  atualizarSenha() {
    this.alterarSenhaLoading = true;
    this.userService.atualizarSenha(this.senhas = new UpdatePasswordForm(this.changePasswordFormGroup.get('senhaAntiga').value,
      this.changePasswordFormGroup.get('senhaNova').value, this.changePasswordFormGroup.get('senhaNovaConfirmar').value)).subscribe((res: ResponseDefault<any>) => {
        if (res.mensagem.includes('sucesso')) {
          this.alertService.success(res.mensagem);
        } else {
          this.alertService.warning(res.mensagem);
        }

        this.alterarSenhaLoading = false;
      }, (err) => {
        this.alertService.danger(err);
        this.alterarSenhaLoading = false;
      });
  }

}
