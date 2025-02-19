import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ProductFormService } from '../../services/product-form.service';
import { ProductService } from '@services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {
  private formService = inject(ProductFormService);
  private productService = inject(ProductService);
  private router = inject(Router);

  productForm = this.formService.createForm();

  // Getters para cada campo
  get idField(): FormControl {
    return this.productForm.get('id') as FormControl;
  }

  get nameField(): FormControl {
    return this.productForm.get('name') as FormControl;
  }

  get descriptionField(): FormControl {
    return this.productForm.get('description') as FormControl;
  }

  get logoField(): FormControl {
    return this.productForm.get('logo') as FormControl;
  }

  get dateReleaseField(): FormControl {
    return this.productForm.get('date_release') as FormControl;
  }

  get dateRevisionField(): FormControl {
    return this.productForm.get('date_revision') as FormControl;
  }

  // Getters para los errores
  get idError(): string | null {
    return this.idField.touched ? this.formService.getFieldError(this.productForm, 'id') : null;
  }

  get nameError(): string | null {
    return this.nameField.touched ? this.formService.getFieldError(this.productForm, 'name') : null;
  }

  get descriptionError(): string | null {
    return this.descriptionField.touched ? this.formService.getFieldError(this.productForm, 'description') : null;
  }

  get logoError(): string | null {
    return this.logoField.touched ? this.formService.getFieldError(this.productForm, 'logo') : null;
  }

  get dateReleaseError(): string | null {
    return this.dateReleaseField.touched ? this.formService.getFieldError(this.productForm, 'date_release') : null;
  }

  get dateRevisionError(): string | null {
    return this.dateRevisionField.touched ? this.formService.getFieldError(this.productForm, 'date_revision') : null;
  }

  async onSubmit() {
    if (this.productForm.valid) {
      try {
        await this.productService.createProduct(this.productForm.value);
        this.router.navigate(['/products']);
      } catch (error) {
        // Manejar error
      }
    }
  }

  resetForm() {
    this.productForm.reset();
  }
}