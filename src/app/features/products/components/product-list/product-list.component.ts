import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '@core/services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);

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

}
