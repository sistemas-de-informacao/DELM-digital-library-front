import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { LocalStorageService } from './../../../services/local-storage.service';
import { AlertService } from 'ngx-alerts';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-user-purchase-history',
  templateUrl: './user-purchase-history.component.html',
  styleUrls: ['./user-purchase-history.component.scss']
})
export class UserPurchaseHistoryComponent implements OnInit {

  id: number;

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels = [['FPS'], ['RPG'], 'Soundbox'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  constructor(private activatedRoute: ActivatedRoute, private localStorageService: LocalStorageService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.id = params.id;
      // tslint:disable-next-line: triple-equals
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
