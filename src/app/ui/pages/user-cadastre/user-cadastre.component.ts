import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

// Models
import { UserCadastreForm } from '../../../models/forms/user-cadastre-form';

// Services
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-cadastre',
  templateUrl: './user-cadastre.component.html',
  styleUrls: ['./user-cadastre.component.scss']
})

export class UserCadastreComponent implements OnInit {

  userCadastreForm: UserCadastreForm;

  userCadastreFormGroup = this.fb.group({
    nickname: [null, [Validators.required, Validators.minLength(5)]],
    nome: [null, [Validators.required, Validators.minLength(5)]],
    user: [null, [Validators.required, Validators.minLength(5), Validators.email]],
    senha: [null, [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private authentication: AuthenticationService) { }

  ngOnInit() { }

  onSubmitToLogin() {
    this.authentication.onLogin(this.createLoginForm());
  }

  createLoginForm(): UserCadastreForm {
    return this.userCadastreForm = new UserCadastreForm(this.userCadastreFormGroup);
  }
}
