import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCadasterComponent } from './admin-cadastre.component';

describe('AdminCadasterComponent', () => {
  let component: AdminCadasterComponent;
  let fixture: ComponentFixture<AdminCadasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCadasterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCadasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
