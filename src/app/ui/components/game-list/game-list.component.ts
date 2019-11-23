import { AlertService } from 'ngx-alerts';
import { ResponseDefault } from './../../../models/response-default';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, filter, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

// Models
import { Game } from './../../../models/game';

// Services
import { GameService } from './../../../services/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})

export class GameListComponent implements OnInit {

  games: Game[] = [];

  pesquisarFormGroup = this.fb.group({
    nome: [null]
  });

  currentUrl: string;

  constructor(private fb: FormBuilder, private router: Router, private gameService: GameService, private alertService: AlertService) { }

  ngOnInit() {
    this.listar();
    this.search();
    this.currentUrl = this.router.url;
  }

  getJogo(id: number, nome: string) {
    this.router.navigate([`/loja/jogo/${this.gameService.converterNomeParaUrl(nome)}`], { queryParams: { id } });
  }

  listar(search?: boolean) {
    this.gameService.listar().subscribe((games: Game[]) => {
      this.games = games;
      if (search === true) {
        this.pesquisarFormGroup.reset();
      }
    });
  }

  search() {
    this.pesquisarFormGroup.get('nome').valueChanges.pipe(
      map(value => value ? value.trim() : value),
      filter(value => value ? value.length >= 3 : value),
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

  getPorNome(nome: string) {
    this.gameService.getPorNome(nome).subscribe((res: ResponseDefault<Array<Game>>) => {
      if (res.body) {
        this.games = res.body;
      } else {
        this.alertService.danger(res.mensagem);
        this.listar();
      }
    }, (err: any) => {
      this.alertService.danger(err.error.text);
      this.listar();
    });
  }

  onClickExcluir(id: number, nome: string) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você excluirá esse jogo logicamente.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#007BFF',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.gameService.deletar(id).subscribe((res: any) => {
          if (res.includes('sucesso')) {
            this.listar();
            Swal.fire(
              'Excluido!',
              `O ${nome} foi excluido com sucesso da DELM Library.`,
              'success'
            );
          }
        }, () => {
          Swal.fire(
            'Erro!',
            `Não foi possível excluir o ${nome} da DELM Library, tente mais tarde.`,
            'error'
          );
        });
      }
    });
  }

}
