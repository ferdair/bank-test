import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ProductService } from '@services/product.service';

export class ProductValidators {
  static dateGreaterThanToday(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return inputDate >= today ? null : { dateInvalid: true };
  }

  static dateOneYearAfter(releaseDate: AbstractControl) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !releaseDate.value) return null;

      const release = new Date(releaseDate.value);
      const revision = new Date(control.value);
      
      const oneYearAfter = new Date(release);
      oneYearAfter.setFullYear(release.getFullYear() + 1);

      return revision.getTime() === oneYearAfter.getTime() ? null : { oneYearAfter: true };
    };
  }

  static createIdValidator(productService: ProductService) {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
      if (!control.value) return null;
      
      try {
        const exists = await productService.verifyIdExists(control.value);
        return exists ? { idExists: true } : null;
      } catch (error) {
        return null;
      }
    };
  }
}