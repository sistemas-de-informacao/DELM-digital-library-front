import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Models
import { User } from 'src/app/models/user';
import { USERS_MOCK } from 'src/app/mocks/users-mock';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  pesquisarFormGroup: FormGroup;
  users: User[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.users = USERS_MOCK;
    this.criarForms();
  }

  criarForms() {
    this.pesquisarFormGroup = this.fb.group({
      pesquisar: [null, [Validators.required]],
    })
  }

}
