import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

// Models
import { UserCadastreForm } from '../../../models/forms/user-cadastre-form';

// Services
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-user-cadastre',
  templateUrl: './user-cadastre.component.html',
  styleUrls: ['./user-cadastre.component.scss']
})

export class UserCadastreComponent implements OnInit {

  user: User = new User();

  userCadastreForm: UserCadastreForm;

  userCadastreFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private authentication: AuthenticationService, private userService: UserService) { }

  ngOnInit() {
    this.criarForms();
  }

  criarForms() {
    this.userCadastreFormGroup = this.fb.group({
      nickname: [null, [Validators.required, Validators.minLength(5)]],
      nome: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.minLength(5), Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmitToLogin() {

    this.criarUsuario(this.user = new User(undefined, this.userCadastreFormGroup.get('nickname').value, this.userCadastreFormGroup.get('nome').value, this.userCadastreFormGroup.get('email').value, this.userCadastreFormGroup.get('senha').value, undefined,
      DateService.getDataAgora(), true));
    console.log(this.user);
  }


  criarUsuario(usuario: User) {
    this.userService.criar(usuario).subscribe(() => {
      console.log('Entrei.');
    });
  }

}
