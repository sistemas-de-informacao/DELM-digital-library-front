import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

// Moels
import { AdminCadastreForm } from '../../../../models/forms/admin-cadastre-form';
import { User } from 'src/app/models/user';
import { UserCadastreForm } from 'src/app/models/forms/user-cadastre-form';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'ngx-alerts';
import { DateService } from 'src/app/services/date.service';
import { Permissoes } from 'src/app/models/permissoes';
import { ResponseDefault } from 'src/app/models/response-default';

@Component({
  selector: 'app-admin-cadastre',
  templateUrl: './admin-cadastre.component.html',
  styleUrls: ['./admin-cadastre.component.scss']
})

export class AdminCadastreComponent implements OnInit {

  user: User = new User();

  userCadastreForm: UserCadastreForm;

  userCadastreFormGroup: FormGroup;

  loading = false;

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

  onSubmitToCadastre() {
    this.criarUsuario(this.user = new User(undefined, this.userCadastreFormGroup.get('nickname').value,
      this.userCadastreFormGroup.get('nome').value, this.userCadastreFormGroup.get('email').value, this.userCadastreFormGroup.get('senha').value, Number.MAX_SAFE_INTEGER,
      DateService.getDataAgora(), true, Permissoes.ADMINISTRADOR));
  }

  criarUsuario(usuario: User) {
    this.loading = true;
    this.userService.criar(usuario).subscribe((res: ResponseDefault<User>) => {
      if (res.body) {
        this.userCadastreForm = null;
        this.userCadastreFormGroup.reset();
        this.alertService.success(res.mensagem);
        this.loading = false;
      } else {
        this.alertService.danger(res.mensagem);
        this.loading = false;
      }
    });
  }

}
