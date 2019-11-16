import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { LocalStorageService } from './../../../services/local-storage.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-user-purchase-history',
  templateUrl: './user-purchase-history.component.html',
  styleUrls: ['./user-purchase-history.component.scss']
})
export class UserPurchaseHistoryComponent implements OnInit {

  id: number;

  constructor(private activatedRoute: ActivatedRoute, private localStorageService: LocalStorageService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.id = params.id;
      if (+this.localStorageService.getId() == this.id) {
        // TODO - listar histórico do usuário referente
      } else {
        this.alertService.danger('Você não tem permissão para acessar essa página');
        setTimeout(() => {
          this.router.navigate(['loja']);
        }, 3000);
      }
    });
  }

}
