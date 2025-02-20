import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ProductFormService } from '../../services/product-form.service';
import { ProductService } from '@services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit{
  private formService = inject(ProductFormService);
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);

  isEditMode = false;

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
        if (this.isEditMode) {
          await this.productService.updateProduct(
            this.route.snapshot.params['id'],
            this.productForm.value
          );
          this.notificationService.showSuccess('Producto actualizado exitosamente');

        } else {
          await this.productService.createProduct(this.productForm.value);
          this.notificationService.showSuccess('Producto creado exitosamente');
        }
        
        this.router.navigate(['/products']);
      } catch (error) {
        console.error('Error al guardar el producto:', error);
      }
    }
  }

  resetForm() {
    this.productForm.reset();
  }

  ngOnInit() {
    // Obtener el ID del producto si estamos en modo edición
    const productId = this.route.snapshot.params['id'];
    if (productId) {
      this.isEditMode = true;
      this.loadProduct(productId);
    }
  }

  private loadProduct(id: string) {
    const product = this.productService.getProductById(id)
    if (product){
      this.idField.disable();
      this.productForm.patchValue(product);
    }
      
    
  }
}