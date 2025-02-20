import { Injectable, signal } from '@angular/core';
import { ApiResponse, Product, ProductCreateResponse, ProductResponse } from '@shared/models';
import { environment } from '@config/api.config';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl;
  private endpoints = environment.endpoints.products;
  public products = signal<Product[]>([]);

  constructor(private http: HttpClient) {}

  loadProducts() {
    return this.http.get<ProductResponse>(`${this.apiUrl}${this.endpoints.base}`)
      .subscribe({
        next: (response) => {
          this.products.set(response.data);
        }
      });
  }

  async createProduct(product: Product): Promise<Product> {
    const url = `${this.apiUrl}${this.endpoints.base}`;
    const response = await firstValueFrom(
      this.http.post<ProductCreateResponse>(url, product)
    );
    
    this.loadProducts();
    return response.data;
  }

  async verifyIdExists(id: string): Promise<boolean> {
    const url = `${this.apiUrl}${this.endpoints.verification}/${id}`;
    return await firstValueFrom(
      this.http.get<boolean>(url)
    );
  }

  getProductById(id: string): Product | undefined {
    const currentProduct = this.products().find(product => product.id === id)
    return currentProduct
  }

  async updateProduct(id: string, product: Product): Promise<Product> {
    const url = `${this.apiUrl}${this.endpoints.base}/${id}`;
    const response = await firstValueFrom(
      this.http.put<ProductCreateResponse>(url, product)
    );
    
    this.loadProducts();
    return response.data;
  }

  async deleteProduct(id: string): Promise<void> {
    const url = `${this.apiUrl}${this.endpoints.base}/${id}`;
    await firstValueFrom(
      this.http.delete<void>(url)
    );

    this.loadProducts();
  }
}
