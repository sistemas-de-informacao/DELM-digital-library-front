import { ResponseDefault } from './../../../../models/response-default';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

// Models
import { UserCadastreForm } from '../../../../models/forms/user-cadastre-form';
import { LoginForm } from 'src/app/models/forms/login-form';
import { User } from '../../../../models/user';

// Services
import { AuthenticationService } from '../../../../services/authentication.service';
import { UserService } from '../../../../services/user.service';
import { DateService } from '../../../../services/date.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-user-cadastre',
  templateUrl: './user-cadastre.component.html',
  styleUrls: ['./user-cadastre.component.scss']
})

export class UserCadastreComponent implements OnInit {

  user: User = new User();

  userCadastreForm: UserCadastreForm;

  userCadastreFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
    this.criarForms();
  }

  criarForms() {
    this.userCadastreFormGroup = this.fb.group({
      nickname: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      nome: [null, [Validators.required, Validators.maxLength(120)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(150)]],
      senha: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(70)]]
    });
  }

  onSubmitToLogin() {
    this.criarUsuario(this.user = new User(undefined, this.userCadastreFormGroup.get('nickname').value,
      this.userCadastreFormGroup.get('nome').value, this.userCadastreFormGroup.get('email').value, this.userCadastreFormGroup.get('senha').value, undefined,
      DateService.getDataAgora(), true));
  }

  criarUsuario(usuario: User) {
    this.userService.criar(usuario).subscribe((res: ResponseDefault<User>) => {
      if (res.body) {
        this.userCadastreForm = null;
        this.userCadastreFormGroup.reset();
        this.alertService.success(res.mensagem);
      } else {
        this.alertService.danger(res.mensagem);
      }
    });
  }

}
