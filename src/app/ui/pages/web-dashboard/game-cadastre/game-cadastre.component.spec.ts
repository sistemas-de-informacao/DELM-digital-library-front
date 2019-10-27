import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCadastreComponent } from './game-cadastre.component';

describe('GameCadastreComponent', () => {
  let component: GameCadastreComponent;
  let fixture: ComponentFixture<GameCadastreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameCadastreComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCadastreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
