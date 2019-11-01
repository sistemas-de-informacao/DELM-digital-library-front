import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Models
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  pesquisarFormGroup: FormGroup;
  users: User[] = [];

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.listar();
    this.criarForms();
  }

  criarForms() {
    this.pesquisarFormGroup = this.fb.group({
      pesquisar: [null, [Validators.required]],
    })
  }

  redirecionarParaUsuario(id: any) {
    this.router.navigate(['comunidade/perfil/display-name/' + 'id'], { queryParams: { id } });
  }

  listar() {
    this.userService.listar().subscribe((users) => {
      this.users = users;
    });
  }

}
