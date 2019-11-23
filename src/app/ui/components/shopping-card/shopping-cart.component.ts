import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})

export class ShoppingCartComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() { }

  isExistemJogosSelecionados(): boolean {
    return this.shoppingCartService.isExistemJogosSelecionados();
  }

}
