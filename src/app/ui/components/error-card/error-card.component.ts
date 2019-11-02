import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-card',
  templateUrl: './error-card.component.html',
  styleUrls: ['./error-card.component.scss']
})
export class ErrorCardComponent implements OnInit {

  @Input() mensagem: string;

  constructor() { }

  ngOnInit() {
  }

}
