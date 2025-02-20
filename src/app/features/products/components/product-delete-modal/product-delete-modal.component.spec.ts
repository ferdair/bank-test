import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDeleteModalComponent } from './product-delete-modal.component';

describe('ProductDeleteModalComponent', () => {
  let component: ProductDeleteModalComponent;
  let fixture: ComponentFixture<ProductDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDeleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
