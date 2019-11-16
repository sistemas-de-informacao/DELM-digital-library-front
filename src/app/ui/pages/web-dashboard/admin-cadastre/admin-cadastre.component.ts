import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

// Moels
import { AdminCadastreForm } from '../../../../models/forms/admin-cadastre-form';

@Component({
  selector: 'app-admin-cadastre',
  templateUrl: './admin-cadastre.component.html',
  styleUrls: ['./admin-cadastre.component.scss']
})

export class AdminCadastreComponent implements OnInit {

  adminForm: AdminCadastreForm;

  adminFormGroup = this.fb.group({
    nickname: [null, [Validators.required, Validators.minLength(5)]],
    nome: [null, [Validators.required, Validators.minLength(5)]],
    email: [null, [Validators.required, Validators.email]],
    saldo: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmitToCreateAdmin() {
    this.adminForm = new AdminCadastreForm(this.adminFormGroup);
    // TODO: Criar usuário com tipo de conta ADMIN
  }

}
