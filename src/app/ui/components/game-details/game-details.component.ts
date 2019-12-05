import { ShoppingCartService } from './../../../services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Models
import { Game } from './../../../models/game';
import { Category } from './../../../models/category';

// Services
import { GameService } from 'src/app/services/game.service';
import { CategoryService } from './../../../services/category.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})

export class GameDetailsComponent implements OnInit, OnDestroy {

  inscricao: Subscription;

  id: number;
  jogo: Game;
  tipoConta = 0;

  categoria: Category;

  usuarioHasJogo: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private gameService: GameService, private categoriaService: CategoryService, private shoppingCartService: ShoppingCartService,
    private storage: AngularFireStorage, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.inscricao = this.route.queryParams.subscribe((queryParams: any) => {
      this.id = queryParams.id;
      this.gameService.getPorId(this.id).subscribe((game: Game) => {
        this.storage.ref(game.id.toString()).getDownloadURL().subscribe((res) => {
          game.fullPath = res;
          this.jogo = game;
          this.hasJogo();
          this.categoriaService.getPorId(this.jogo.idCategoria).subscribe((categoria: Category) => {
            this.categoria = categoria;
          });
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

  irParaEditarJogo(id: number) {
    this.router.navigate(['dashboard/editar-jogo/jogo'], { queryParams: { id } });
  }

  adicionarNaSacola(jogo: Game) {
    this.shoppingCartService.adicionarJogoLocalStorage(jogo);
    this.shoppingCartService.atualizarSacola();
  }

  hasJogo(): void {
    this.gameService.hasJogo(this.jogo.id, +this.localStorageService.getId()).subscribe((hasJogo: boolean) => {
      hasJogo === true ? this.usuarioHasJogo = true : this.usuarioHasJogo = false;
    });
  }

}
