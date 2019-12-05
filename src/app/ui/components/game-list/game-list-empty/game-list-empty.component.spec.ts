import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListEmptyComponent } from './game-list-empty.component';

describe('GameListEmptyComponent', () => {
  let component: GameListEmptyComponent;
  let fixture: ComponentFixture<GameListEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameListEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
