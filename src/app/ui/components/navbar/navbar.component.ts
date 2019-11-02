import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  id: string;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario() {
    this.userService.get().subscribe((user: User) => {
      this.id = user.nickname;
      this.id = this.id.substring(0, 5);
    });
  }

}
