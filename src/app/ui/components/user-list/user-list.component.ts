import { AlertService } from 'ngx-alerts';
import { ResponseDefault } from './../../../models/response-default';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Models
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { map, filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  pesquisarFormGroup: FormGroup;
  users: User[] = [];

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
    this.listar();
    this.criarForms();
    this.search();
  }

  criarForms() {
    this.pesquisarFormGroup = this.fb.group({
      nome: [null, [Validators.required]]
    });
  }


  listar() {
    this.userService.listar().subscribe((users) => {
      this.users = users;
    });
  }

  search() {
    this.pesquisarFormGroup.get('nome').valueChanges.pipe(
      map(value => value ? value.trim() : value),
      filter(value => value.length >= 3),
      debounceTime(350),
      distinctUntilChanged(),
      tap(value => this.getPorNome(value))
    ).subscribe();

    this.pesquisarFormGroup.get('nome').valueChanges.pipe(
      map(value => value ? value.trim() : value),
      filter(value => value.length === 0),
      tap(() => this.listar())
    ).subscribe();
  }

  getPorNome(nickname: string) {
    this.userService.getAllPorNickname(nickname).subscribe((res: ResponseDefault<Array<User>>) => {
      if (res.body) {
        this.users = res.body;
      } else {
        this.alertService.danger(res.mensagem);
        this.listar();
      }
    }, (err: any) => {
      this.alertService.danger(err.error.text);
      this.listar();
    });
  }

  redirecionarParaUsuario(id: any) {
    this.router.navigate(['comunidade/perfil/display-name/' + 'id'], { queryParams: { id } });
  }

}
