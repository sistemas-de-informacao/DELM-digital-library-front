import { LocalStorageService } from './../../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { User } from './../../../models/user';

// Services
import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  id: string;

  constructor(private userService: UserService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario() {
    if (this.localStorageService.getId()) {
      this.userService.get().subscribe((user: User) => {
        this.id = user.nickname;
        this.id = this.id.substring(0, 5);
      });
    }
  }

}
