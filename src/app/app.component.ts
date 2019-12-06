import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(private userService: UserService, private authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService) {
    this.getUser();
  }

  getUser() {
    this.userService.getPorId(+this.localStorageService.getId()).subscribe((res) => {
      this.authenticationService.attUserLogado(res);
    }, () => this.authenticationService.sair());
  }

}
