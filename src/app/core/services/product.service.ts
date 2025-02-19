import { Injectable, signal } from '@angular/core';
import { Product, ProductCreateResponse, ProductResponse } from '@shared/models';
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
}
