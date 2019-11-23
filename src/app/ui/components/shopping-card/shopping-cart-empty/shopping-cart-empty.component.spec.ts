import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartEmptyComponent } from './shopping-cart-empty.component';

describe('ShoppingCartEmptyComponent', () => {
  let component: ShoppingCartEmptyComponent;
  let fixture: ComponentFixture<ShoppingCartEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingCartEmptyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
