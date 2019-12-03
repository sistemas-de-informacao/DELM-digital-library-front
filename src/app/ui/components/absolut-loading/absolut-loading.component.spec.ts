import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsolutLoadingComponent } from './absolut-loading.component';

describe('AbsolutLoadingComponent', () => {
  let component: AbsolutLoadingComponent;
  let fixture: ComponentFixture<AbsolutLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsolutLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsolutLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
