import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

// Models
import { LoginForm } from 'src/app/models/forms/login-form';
import { ResponseDefault } from './../../../../models/response-default';
import { User } from './../../../../models/user';

// Services
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: LoginForm;

  loginFormGroup = this.fb.group({
    user: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
    senha: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(70)]]
  });

  constructor(private fb: FormBuilder, private authentication: AuthenticationService, private alertService: AlertService, private userService: UserService) { }

  ngOnInit() { }

  onSubmitToLogin() {
    this.authentication.onLogin(this.criarFormLogin()).subscribe((res: ResponseDefault<User>) => {
      if (res.body) {
        this.authentication.entrar(res.body);
        this.userService.toggle();
      } else {
        this.alertService.danger(res.mensagem);
      }
    });
  }

  criarFormLogin(): LoginForm {
    return this.loginForm = new LoginForm(this.loginFormGroup);
  }

}
