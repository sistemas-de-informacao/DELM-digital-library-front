import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCadastreComponent } from './category-cadastre.component';

describe('CategoryCadastreComponent', () => {
  let component: CategoryCadastreComponent;
  let fixture: ComponentFixture<CategoryCadastreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryCadastreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCadastreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
