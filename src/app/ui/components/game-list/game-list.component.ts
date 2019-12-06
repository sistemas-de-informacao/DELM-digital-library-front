import { AlertService } from 'ngx-alerts';
import { ResponseDefault } from './../../../models/response-default';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, filter, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

// Models
import { Game } from './../../../models/game';

// Services
import { GameService } from './../../../services/game.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})

export class GameListComponent implements OnInit {

  @Input() library: any;

  games: Game[] = [];

  pesquisarFormGroup = this.fb.group({
    nome: [null]
  });

  currentUrl: string;

  loading = false;
  loadingGames = false;
  isListEmpty = false;

  constructor(private fb: FormBuilder, private router: Router,
    private gameService: GameService, private alertService: AlertService,
    private storage: AngularFireStorage, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.listar();
    this.search();
    this.currentUrl = this.router.url;
  }

  getJogo(id: number, nome: string) {
    this.router.navigate([`/loja/jogo/${this.gameService.converterNomeParaUrl(nome)}`], { queryParams: { id } });
  }

  listar(search?: boolean) {
    this.loadingGames = true;
    this.games = [];
    this.gameService.listar(this.library).subscribe((games: Game[]) => {
      if (games) {
        games.forEach(game => {
          this.storage.ref(game.id.toString()).getDownloadURL().subscribe((res) => {
            game.fullPath = res;
            this.games.push(game);
          });

          if (games.lastIndexOf) {
            this.loadingGames = false;
            this.isListEmpty = false;
            if (search === true) {
              this.pesquisarFormGroup.reset();
            }
          }
        });

      } else {
        this.loadingGames = false;
        this.isListEmpty = true;
      }
    }, () => { this.loadingGames = false; this.isListEmpty = true; });
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
    this.loadingGames = true;
    this.gameService.getPorNome(nome).subscribe((res: ResponseDefault<Array<Game>>) => {
      if (res.body) {
        this.games = [];
        res.body.forEach(game => {
          this.storage.ref(game.nome).getDownloadURL().subscribe((full) => {
            game.fullPath = full;
            this.games.push(game);
          });

          if (res.body.lastIndexOf) { this.loadingGames = false; }
        });
      } else {
        this.alertService.danger(res.mensagem);
        this.listar();
        this.loadingGames = false;
      }
    }, (err: any) => {
      this.alertService.danger(err.error.text);
      this.listar();
      this.loadingGames = false;
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
        this.loading = true;
        this.gameService.deletar(id).subscribe((res: any) => {
          if (res.includes('sucesso')) {
            this.loading = false;
            this.listar();
            Swal.fire(
              'Excluido!',
              `O ${nome} foi excluido com sucesso da DELM Library.`,
              'success'
            );
          } else {
            this.loading = false;
            Swal.fire(
              'Erro!',
              `${res}`,
              'error'
            );
          }
        }, () => {
          this.error(nome);
        });
      }
    });
  }

  error(nome: string) {
    this.loading = false;
    Swal.fire(
      'Erro!',
      `Não foi possível excluir o ${nome} da DELM Library, tente mais tarde.`,
      'error'
    );
  }

}
