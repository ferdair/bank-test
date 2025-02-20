import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductFormService } from '@features/products/services/product-form.service';
import { ProductService } from '@services/product.service';
import { ProductValidators } from '@features/products/validators/product.validator';
import { PRODUCT_FORM_ERRORS } from '@features/products/models/form-error.interface';
import { EMPTY, firstValueFrom } from 'rxjs';

jest.mock('@services/product.service');

describe('ProductFormService', () => {
  let service: ProductFormService;
  let productService: jest.Mocked<ProductService>;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        ProductFormService,
        ProductService
      ]
    });

    service = TestBed.inject(ProductFormService);
    productService = TestBed.inject(ProductService) as jest.Mocked<ProductService>;
    productService.verifyIdExists = jest.fn().mockResolvedValue(false);
    form = service.createForm();
  });

  describe('Async Validation', () => {
    it('should pass validation when ID is unique', fakeAsync(() => {
      const idControl = form.get('id');
      productService.verifyIdExists.mockResolvedValue(false);
      
      idControl?.setValue('new-unique-id');
      idControl?.markAsTouched();
      tick();
      
      expect(idControl?.hasError('idExists')).toBeFalsy();
    }));
  });

  describe('Form Error Messages', () => {
    it('should handle custom error messages', () => {
      const control = form.get('id');
      control?.setErrors({ idExists: true });
      control?.markAsTouched();
      
      const errorMessage = service.getFieldError(form, 'id');
      const expectedMessage = PRODUCT_FORM_ERRORS["id"].find(e => e.errorKey === 'idExists')?.message || null;
      expect(errorMessage).toBe(expectedMessage);
    });

    it('should return different messages for different error types on same field', () => {
      const nameControl = form.get('name');
      
      nameControl?.setValue('');
      nameControl?.markAsTouched();
      let errorMessage = service.getFieldError(form, 'name');
      const requiredMessage = PRODUCT_FORM_ERRORS["name"].find(e => e.errorKey === 'required')?.message || null;
      expect(errorMessage).toBe(requiredMessage);
    
      nameControl?.setValue('test');
      errorMessage = service.getFieldError(form, 'name');
      const minLengthMessage = PRODUCT_FORM_ERRORS["name"].find(e => e.errorKey === 'minlength')?.message || null;
      expect(errorMessage).toBe(minLengthMessage);
    });
  });

  describe('Date Validation Edge Cases', () => {
    it('should validate date_release exactly on today as invalid', () => {
      const dateReleaseControl = form.get('date_release');
      const today = new Date();
      
      dateReleaseControl?.setValue(today.toISOString().split('T')[0]);
      expect(dateReleaseControl?.hasError('dateInvalid')).toBeTruthy();
    });

    it('should validate date_revision exactly one year after as valid', () => {
      const dateReleaseControl = form.get('date_release');
      const dateRevisionControl = form.get('date_revision');
      
      const releaseDate = new Date();
      releaseDate.setDate(releaseDate.getDate() + 1);
      const revisionDate = new Date(releaseDate);
      revisionDate.setFullYear(releaseDate.getFullYear() + 1);
      
      dateReleaseControl?.setValue(releaseDate.toISOString().split('T')[0]);
      dateRevisionControl?.setValue(revisionDate.toISOString().split('T')[0]);
      
      expect(dateRevisionControl?.hasError('oneYearAfter')).toBeFalsy();
    });
  });
});