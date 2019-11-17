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

  constructor(private userService: UserService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario() {
    this.userService.toggle();
    this.userService.getNickname.subscribe((nome) => {
      this.nickname = nome;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  sair() {
    this.authenticationService.sair();
  }

}
