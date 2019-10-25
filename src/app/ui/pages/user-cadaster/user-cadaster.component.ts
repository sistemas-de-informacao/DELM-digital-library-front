import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CadastreForm } from './../../../models/cadastre-form';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-cadaster',
  templateUrl: './user-cadaster.component.html',
  styleUrls: ['./user-cadaster.component.scss']
})

export class UserCadasterComponent implements OnInit {

  userCadastreForm: CadastreForm;

  userCadastreFormGroup = this.fb.group({
    displayName: [null, [Validators.required, Validators.minLength(5)]],
    name: [null, [Validators.required, Validators.minLength(5)]],
    user: [null, [Validators.required, Validators.minLength(5), Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private authentication: AuthenticationService) { }

  ngOnInit() { }

  onSubmitToLogin() {
    this.authentication.onLogin(this.createLoginForm());
  }

  createLoginForm(): CadastreForm {
    return this.userCadastreForm = new CadastreForm(this.userCadastreFormGroup);
  }
}
