import { ShoppingCartService } from './../../../services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// Services
import { UserService } from './../../../services/user.service';
import { AuthenticationService } from './../../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, OnDestroy {

  nickname: string;
  isLogado: boolean;

  subscription: Subscription;

  qtdJogos = 0;

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.getUsuario();
    this.getQtdJogosSelecionados();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getUsuario() {
    this.userService.toggle();
    this.userService.getNickname.subscribe((nome) => {
      this.nickname = nome;
    });
  }

  getQtdJogosSelecionados() {
    this.shoppingCartService.atualizarSacola();
    this.shoppingCartService.qtdSelecionados.subscribe((qtd: number) => {
      this.qtdJogos = qtd;
    });
  }

  sair() {
    this.authenticationService.sair();
  }

}
