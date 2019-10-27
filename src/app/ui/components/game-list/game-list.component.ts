import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})

export class GameListComponent implements OnInit {

  MOCK_GAME: any = [{
    name: 'GTA',
    price: 1000,
    img: null
  }, {
    name: 'GTA',
    price: 1000,
    img: null
  }, {
    name: 'GTA',
    price: 1000,
    img: null
  }];

  searchFormGroup = this.fb.group({
    name: [null]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
