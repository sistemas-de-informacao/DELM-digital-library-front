import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

// Models
import { LoginForm } from 'src/app/models/forms/login-form';
import { User } from 'src/app/models/user';

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

  constructor(private fb: FormBuilder, private authentication: AuthenticationService, private alertService: AlertService) { }

  ngOnInit() { }

  onSubmitToLogin() {
    this.authentication.onLogin(this.criarFormLogin()).subscribe((user: User) => {
      if (user) {
        this.authentication.entrar(user);
      } else {
        this.alertService.danger('Usuário não existe e/ou senha incorreta.');
      }
    });
  }

  criarFormLogin(): LoginForm {
    return this.loginForm = new LoginForm(this.loginFormGroup);
  }

}
