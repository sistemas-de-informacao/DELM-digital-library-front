import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  dataAgora = new Date();
  developersTeam: string[] = ['Daniel Vieira', ' Edson Camargo', ' Lucas Pelinzon', ' Matheus Fracaroli'];

  constructor() { }

}
