import { CommonModule } from '@angular/common';
import { Component, computed, HostListener, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '@core/services/notification.service';
import { ProductService } from '@core/services/product.service';
import { Product } from '@shared/models';
import { ProductDeleteModalComponent } from '../product-delete-modal/product-delete-modal.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductDeleteModalComponent],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  searchTerm = signal<string>('');
  pageSize = signal<number>(5);
  
  filteredProducts = computed(() => {
    const products = this.productService.products();
    const term = this.searchTerm().toLowerCase();
    
    return products
      .filter(product => 
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
      )
      .slice(0, this.pageSize());
  });

  totalResults = computed(() => {
    return this.filteredProducts().length;
  });

  activeDropdown: string | null = null;
  showDeleteModal = false;
  selectedProduct: Product | null = null;


  ngOnInit() {
    this.productService.loadProducts();
  }

  updateSearch(term: string) {
    this.searchTerm.set(term);
  }

  updatePageSize(size: string) {
    this.pageSize.set(Number(size));
  }

  navigateToCreate() {
    this.router.navigate(['/products/create']);
  }

  editProduct(productId: string) {
    this.router.navigate(['/products/edit', productId]);
  }

  toggleDropdown(productId: string) {
    this.activeDropdown = this.activeDropdown === productId ? null : productId;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    if (!(event.target as HTMLElement).closest('.dropdown')) {
      this.activeDropdown = null;
    }
  }

  async deleteProduct(product: Product) {
    this.selectedProduct = product;
    this.showDeleteModal = true;
    this.activeDropdown = null;
  }

  async confirmDelete() {
    if (this.selectedProduct) {
      try {
        await this.productService.deleteProduct(this.selectedProduct.id);
        this.showDeleteModal = false;
        this.selectedProduct = null;
        this.notificationService.showSuccess('Producto eliminado exitosamente');
      } catch (error) {
        this.notificationService.showError('Error al eliminar el producto');
      }
    }
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.selectedProduct = null;
  }
}
