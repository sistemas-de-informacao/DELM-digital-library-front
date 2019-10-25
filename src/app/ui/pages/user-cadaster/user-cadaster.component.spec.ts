import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCadasterComponent } from './user-cadaster.component';

describe('UserCadasterComponent', () => {
  let component: UserCadasterComponent;
  let fixture: ComponentFixture<UserCadasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCadasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCadasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
