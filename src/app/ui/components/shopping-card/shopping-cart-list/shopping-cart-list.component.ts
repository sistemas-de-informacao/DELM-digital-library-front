import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Cart } from './../../../../models/cart';
import { Game } from 'src/app/models/game';
import { ShoppingCartService } from './../../../../services/shopping-cart.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.scss']
})
export class ShoppingCartListComponent implements OnInit {

  pesquisarFormGroup: FormGroup;

  usuario: User;

  games: Game[] = [];

  total = 0;

  cart: Cart;

  constructor(private fb: FormBuilder, private shoppingCartService: ShoppingCartService, private userService: UserService) { }

  ngOnInit() {
    this.criarForms();
    this.getUsuario();
    this.listar();
  }

  criarForms() {
    this.pesquisarFormGroup = this.fb.group({
      nome: [null, [Validators.required]]
    });
  }

  getUsuario() {
    this.userService.getUserLogado().subscribe((user: User) => {
      this.usuario = user;
    });
  }

  listar() {
    this.games = this.shoppingCartService.listar();
    this.games.forEach(game => {
      this.total += game.preco;
    });
  }

  excluir(jogo: Game) {
    this.shoppingCartService.removerDaSacola(jogo);
    this.shoppingCartService.atualizarSacola();
    this.total = 0;
    this.listar();
  }

  finalizarCompra() {
    Swal.fire({
      title: 'Você tem certeza?',
      text: `Você comprará os jogos no valor de ${this.total} reais.`,
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#007BFF',
      cancelButtonColor: '#c6c6c6',
      confirmButtonText: 'Sim, comprar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.shoppingCartService.finalizarCompra(this.cart = new Cart(this.games, this.total, this.usuario)).subscribe(() => {
          this.esvaziarSacola();
          Swal.fire(
            'Comprado!',
            `Compra realizada com sucesso.`,
            'success'
          );
        });
      }
    });
  }

  esvaziarSacola() {
    this.games = [];
    this.total = 0;
    this.cart = null;
  }

}
