import { Injectable, signal } from '@angular/core';
import { Product, ProductResponse } from '@shared/models';
import { environment } from '@config/api.config';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl;
  private endpoints = environment.endpoints.products;
  private products = signal<Product[]>([]);

  constructor(private http: HttpClient) {}
  getProducts() {
    const url = `${this.apiUrl}${this.endpoints.base}`;
    return this.http.get<ProductResponse>(url).subscribe({
      next: (response) => {
        this.products.set(response.data);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }
}
