import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { environment } from '@config/api.config';
import { Product } from '@shared/models';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    { 
      id: 'PD001', 
      name: 'Test Product 1', 
      description: 'First test product description',
      logo: 'https://example.com/logo1.png',
      date_release: '2024-02-19',
      date_revision: '2025-02-19'
    },
    { 
      id: 'PD002', 
      name: 'Test Product 2', 
      description: 'Second test product description',
      logo: 'https://example.com/logo2.png',
      date_release: '2024-01-15',
      date_revision: '2025-01-15'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadProducts', () => {
    it('should load products and update products signal', () => {
      service.loadProducts();

      const req = httpMock.expectOne(environment.endpoints.products.base);
      expect(req.request.method).toBe('GET');
      
      req.flush({ data: mockProducts });

      expect(service.products()).toEqual(mockProducts);
    });

    it('should handle empty response', () => {
      service.loadProducts();

      const req = httpMock.expectOne('/bp/products');
      req.flush({ data: [] });
      
      expect(service.products()).toEqual([]);
    });
  });

  describe('createProduct', () => {
    const newProduct: Product = {
      id: 'PD003',
      name: 'New Test Product',
      description: 'New test product description',
      logo: 'https://example.com/logo3.png',
      date_release: '2024-03-01',
      date_revision: '2025-03-01'
    };

    it('should handle errors during product creation', async () => {
      const failedRequest = service.createProduct(newProduct);
    
      const req = httpMock.expectOne('/bp/products');
      
      req.error(new ErrorEvent('Network error'));
    
      try {
        await failedRequest;
        fail('Promise should have been rejected');
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });

  describe('verifyIdExists', () => {
    it('should return true for existing product ID', async () => {
      const testId = 'PD003';
      const verifyPromise = service.verifyIdExists(testId);

      const req = httpMock.expectOne(`${environment.apiUrl}${environment.endpoints.products.verification}/${testId}`);
      expect(req.request.method).toBe('GET');
      req.flush(true);

      const result = await verifyPromise;
      expect(result).toBe(true);
    });

    it('should return false for non-existing product ID', async () => {
      const testId = 'NONEXISTENT';
      const verifyPromise = service.verifyIdExists(testId);

      const req = httpMock.expectOne(`${environment.apiUrl}${environment.endpoints.products.verification}/${testId}`);
      expect(req.request.method).toBe('GET');
      req.flush(false);

      const result = await verifyPromise;
      expect(result).toBe(false);
    });
  });

  describe('getProductById', () => {

    it('should return undefined for non-existing ID', () => {
      service.products.set(mockProducts);
      const result = service.getProductById('NONEXISTENT');
      expect(result).toBeUndefined();
    });

    it('should return undefined when products array is empty', () => {
      service.products.set([]);
      const result = service.getProductById('PD001');
      expect(result).toBeUndefined();
    });
  });

  describe('updateProduct', () => {
    it('should handle errors when updating product', async () => {
      const productId = 'PD003';
      const updatedProduct = { ...mockProducts[0], name: 'Updated Product 1' };
      
      const updatePromise = service.updateProduct(productId, updatedProduct);
  
      const req = httpMock.expectOne(`${environment.apiUrl}${environment.endpoints.products.base}/${productId}`);
      
      req.error(new ErrorEvent('Network error'));
  
      try {
        await updatePromise;
        fail('Promise should have been rejected');
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
});