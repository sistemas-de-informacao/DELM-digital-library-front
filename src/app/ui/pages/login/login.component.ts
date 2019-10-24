import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, FormBuilder, Validators } from '@angular/forms';

// Models
import { LoginForm } from 'src/app/models/login-form';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: LoginForm;

  loginFormGroup = this.fb.group({
    user: [null, [Validators.required, Validators.minLength(5)]],
    password: [null, [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private authentication: AuthenticationService) { }

  ngOnInit() { }

  onSubmitToLogin() {
    this.authentication.onLogin(this.createLoginForm());
  }

  createLoginForm(): LoginForm {
    return this.loginForm = new LoginForm(this.loginFormGroup);
  }

}
