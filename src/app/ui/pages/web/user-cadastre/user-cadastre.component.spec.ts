import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCadastreComponent } from './user-cadastre.component';

describe('UserCadasterComponent', () => {
  let component: UserCadastreComponent;
  let fixture: ComponentFixture<UserCadastreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserCadastreComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCadastreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
