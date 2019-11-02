import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, FormBuilder, Validators } from '@angular/forms';

// Models
import { LoginForm } from 'src/app/models/forms/login-form';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: LoginForm;

  loginFormGroup = this.fb.group({
    user: [null, [Validators.required, Validators.minLength(5)]],
    senha: [null, [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private authentication: AuthenticationService, private route: Router) { }

  ngOnInit() { }

  onSubmitToLogin() {
    this.authentication.onLogin(this.createLoginForm()).subscribe((user: User) => {
      localStorage.setItem('id-user', user.id.toString());
      const id = localStorage.setItem('id-user', user.id.toString());
      this.route.navigate(['/loja/biblioteca'], { queryParams: { id } });
    });
  }

  createLoginForm(): LoginForm {
    return this.loginForm = new LoginForm(this.loginFormGroup);
  }

}
