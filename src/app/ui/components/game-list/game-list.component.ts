import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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

  tipoConta = 0;

  searchFormGroup = this.fb.group({
    nome: [null]
  });

  constructor(private fb: FormBuilder, private router: Router, private gameService: GameService) { }

  ngOnInit() {
    this.listar();
  }

  getJogo(id: number, nome: string) {
    this.router.navigate([`/loja/jogo/${this.gameService.converterNomeParaUrl(nome)}`], { queryParams: { id } });
  }

  listar() {
    this.gameService.listar().subscribe((games: Game[]) => {
      this.games = games;
    });
  }

  onClickExcluir(id: number, nome: string) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você excluirá esse jogo logicamente.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007BFF',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!'
    }).then((result) => {
      if (result.value) {
        this.gameService.deletar(id).subscribe(() => {
          this.listar();
          Swal.fire(
            'Excluido!',
            `O ${nome} foi excluido com sucesso da DELM Library.`,
            'success'
          );
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
