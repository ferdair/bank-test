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
  public products = signal<Product[]>([]);

  constructor(private http: HttpClient) {}

  loadProducts() {
    const url = `${this.apiUrl}${this.endpoints.base}`;
    console.log('URL completa:', url);

    return this.http.get<ProductResponse>(url).subscribe({
      next: (response) => {
        console.log('Respuesta recibida:', response);
        this.products.set([
          {
            id: '1',
            name: 'Tarjeta de Crédito Clásica',
            description: 'Tarjeta de crédito para compras diarias Tarjeta de crédito para compras diarias',
            logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
            date_release: '2024-01-15',
            date_revision: '2025-01-15'
          },
          {
            id: '2',
            name: 'Cuenta de Ahorro Premium',
            description: 'Cuenta de ahorro con altos rendimientos',
            logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
            date_release: '2024-02-20',
            date_revision: '2025-02-20'
          },
          {
            id: '3',
            name: 'Préstamo Personal Flexible',
            description: 'Préstamo con tasas competitivas',
            logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
            date_release: '2024-03-10',
            date_revision: '2025-03-10'
          },
          {
            id: '4',
            name: 'Préstamo Personal Flexible',
            description: 'Préstamo con tasas competitivas',
            logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
            date_release: '2024-03-10',
            date_revision: '2025-03-10'
          },
          {
            id: '5',
            name: 'Préstamo Personal Flexible',
            description: 'Préstamo con tasas competitivas',
            logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
            date_release: '2024-03-10',
            date_revision: '2025-03-10'
          },
          {
            id: '6',
            name: 'Préstamo Personal Flexible',
            description: 'Préstamo con tasas competitivas',
            logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
            date_release: '2024-03-10',
            date_revision: '2025-03-10'
          },
          {
            id: '7',
            name: 'Préstamo Personal Flexible',
            description: 'Préstamo con tasas competitivas',
            logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
            date_release: '2024-03-10',
            date_revision: '2025-03-10'
          },
          {
            id: '8',
            name: 'Préstamo Personal Flexible',
            description: 'Préstamo con tasas competitivas',
            logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
            date_release: '2024-03-10',
            date_revision: '2025-03-10'
          },
          {
            id: '9',
            name: 'Préstamo Personal Flexible',
            description: 'Préstamo con tasas competitivas',
            logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
            date_release: '2024-03-10',
            date_revision: '2025-03-10'
          },
          {
            id: '10',
            name: 'Préstamo Personal Flexible',
            description: 'Préstamo con tasas competitivas',
            logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
            date_release: '2024-03-10',
            date_revision: '2025-03-10'
          },
          {
            id: '11',
            name: 'Préstamo Personal Flexible',
            description: 'Préstamo con tasas competitivas',
            logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
            date_release: '2024-03-10',
            date_revision: '2025-03-10'
          },
          {
            id: '12',
            name: 'Préstamo Personal Flexible',
            description: 'Préstamo con tasas competitivas',
            logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
            date_release: '2024-03-10',
            date_revision: '2025-03-10'
          },
          {
            id: '13',
            name: 'Préstamo Personal Flexible',
            description: 'Préstamo con tasas competitivas',
            logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
            date_release: '2024-03-10',
            date_revision: '2025-03-10'
          },
          {
            id: '14',
            name: 'Préstamo Personal Flexible',
            description: 'Préstamo con tasas competitivas',
            logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
            date_release: '2024-03-10',
            date_revision: '2025-03-10'
          },
          {
            id: '15',
            name: 'Préstamo Personal Flexible',
            description: 'Préstamo con tasas competitivas',
            logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
            date_release: '2024-03-10',
            date_revision: '2025-03-10'
          },
          {
            id: '16',
            name: 'Préstamo Personal Flexible',
            description: 'Préstamo con tasas competitivas',
            logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
            date_release: '2024-03-10',
            date_revision: '2025-03-10'
          }
        ]);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        console.error('Error completo:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error config:', error.config);
      },
    });
  }
}
