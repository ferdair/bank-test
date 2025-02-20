import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductFormService } from './product-form.service';
import { ProductService } from '@services/product.service';
import { ProductValidators } from '@features/products/validators/product.validator';

describe('ProductFormService', () => {
  let service: ProductFormService;
  let productServiceMock: { validateId: jest.Mock };

  beforeEach(() => {
    productServiceMock = {
      validateId: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        ProductFormService,
        FormBuilder,
        { provide: ProductService, useValue: productServiceMock }
      ]
    });

    service = TestBed.inject(ProductFormService);
  });

  describe('createForm', () => {
    let form: FormGroup;

    beforeEach(() => {
      form = service.createForm();
    });

    it('should create a form with all required fields', () => {
      expect(form.get('id')).toBeTruthy();
      expect(form.get('name')).toBeTruthy();
      expect(form.get('description')).toBeTruthy();
      expect(form.get('logo')).toBeTruthy();
      expect(form.get('date_release')).toBeTruthy();
      expect(form.get('date_revision')).toBeTruthy();
    });

    describe('id field', () => {
      it('should have required validator', () => {
        const control = form.get('id')!;
        control.setValue('');
        expect(control.errors?.['required']).toBeTruthy();
      });

      it('should have minLength validator', () => {
        const control = form.get('id')!;
        control.setValue('ab');
        expect(control.errors?.['minlength']).toBeTruthy();
      });

      it('should have maxLength validator', () => {
        const control = form.get('id')!;
        control.setValue('12345678901');
        expect(control.errors?.['maxlength']).toBeTruthy();
      });
    });

    describe('name field', () => {
      it('should have required validator', () => {
        const control = form.get('name')!;
        control.setValue('');
        expect(control.errors?.['required']).toBeTruthy();
      });

      it('should have minLength validator', () => {
        const control = form.get('name')!;
        control.setValue('test');
        expect(control.errors?.['minlength']).toBeTruthy();
      });

      it('should have maxLength validator', () => {
        const control = form.get('name')!;
        control.setValue('a'.repeat(101));
        expect(control.errors?.['maxlength']).toBeTruthy();
      });
    });

    describe('description field', () => {
      it('should have required validator', () => {
        const control = form.get('description')!;
        control.setValue('');
        expect(control.errors?.['required']).toBeTruthy();
      });

      it('should have minLength validator', () => {
        const control = form.get('description')!;
        control.setValue('short');
        expect(control.errors?.['minlength']).toBeTruthy();
      });

      it('should have maxLength validator', () => {
        const control = form.get('description')!;
        control.setValue('a'.repeat(201));
        expect(control.errors?.['maxlength']).toBeTruthy();
      });
    });

    describe('date_release field', () => {
      it('should have required validator', () => {
        const control = form.get('date_release')!;
        control.setValue('');
        expect(control.errors?.['required']).toBeTruthy();
      });
    });

    describe('date_revision field', () => {
      it('should have required validator', () => {
        const control = form.get('date_revision')!;
        control.setValue('');
        expect(control.errors?.['required']).toBeTruthy();
      });
    });

    describe('logo field', () => {
      it('should have required validator', () => {
        const control = form.get('logo')!;
        control.setValue('');
        expect(control.errors?.['required']).toBeTruthy();
      });
    });
  });

  describe('getFieldError', () => {
    let form: FormGroup;

    beforeEach(() => {
      form = service.createForm();
    });

    it('should return null if control does not exist', () => {
      const error = service.getFieldError(form, 'nonexistent');
      expect(error).toBeNull();
    });

    it('should return null if control has no errors', () => {
      const control = form.get('name')!;
      control.setValue('Valid Name');
      const error = service.getFieldError(form, 'name');
      expect(error).toBeNull();
    });

    it('should return null if control is not touched', () => {
      const control = form.get('name')!;
      control.setValue('');
      const error = service.getFieldError(form, 'name');
      expect(error).toBeNull();
    });

    it('should return error message for invalid field', () => {
      const control = form.get('name')!;
      control.setValue('');
      control.markAsTouched();
      const error = service.getFieldError(form, 'name');
      expect(error).toBeTruthy();
    });
  });
});