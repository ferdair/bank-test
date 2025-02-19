// src/app/features/products/services/product-form.service.ts
import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductValidators } from '@features/products/validators/product.validator';
import { ProductService } from '@services/product.service';
import { PRODUCT_FORM_ERRORS } from '../models/form-error.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductFormService {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);

  createForm(): FormGroup {
    const form = this.fb.group({
      id: ['', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10)
        ],
        asyncValidators: [ProductValidators.createIdValidator(this.productService)],
        updateOn: 'blur'
      }],
      name: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]],
      logo: ['', Validators.required],
      date_release: ['', [
        Validators.required,
        ProductValidators.dateGreaterThanToday
      ]],
      date_revision: ['', [
        Validators.required
      ]]
    });

    const dateRevisionControl = form.get('date_revision') as FormControl;
    dateRevisionControl.addValidators(ProductValidators.dateOneYearAfter(form.get('date_release')!));

    return form;
  }

  getFieldError(form: FormGroup, fieldName: string): string | null {
    const control = form.get(fieldName);
    if (!control || !control.errors || !control.touched) return null;

    const errors = PRODUCT_FORM_ERRORS[fieldName];
    const errorKey = Object.keys(control.errors)[0];
    const error = errors.find(e => e.errorKey === errorKey);

    return error?.message || null;
  }
}