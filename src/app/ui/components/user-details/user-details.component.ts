import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { USERS_MOCK } from 'src/app/mocks/users-mock';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  id: string;
  user: User;

  constructor(private router: ActivatedRoute, private userServices: UserService) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario() {
    this.router.queryParams.subscribe((queryParams: any) => {
      this.id = queryParams.id;
      this.userServices.getPorId(+this.id).subscribe((user: User) => {
        this.user = user;
      });
    });
  }

}
