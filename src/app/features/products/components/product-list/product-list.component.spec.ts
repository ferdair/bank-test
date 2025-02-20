import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '@core/services/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  
  
  const mockProductsData = [
    {
      id: '1',
      name: 'Producto 1',
      description: 'Descripción 1',
      logo: 'logo1.png',
      date_release: new Date('2023-01-01'),
      date_revision: new Date('2024-01-01')
    },
    {
      id: '2',
      name: 'Producto 2',
      description: 'Descripción 2',
      logo: 'logo2.png',
      date_release: new Date('2023-02-01'),
      date_revision: new Date('2024-02-01')
    }
  ];
  let mockProductService = {
    loadProducts: jest.fn(),
    products: signal(mockProductsData)
  };

  let mockRouter: {
    navigate: jest.Mock
  };

  beforeAll(() => {
    mockRouter = {
      navigate: jest.fn()
    };
  });

  beforeEach(async () => {
    mockProductService = {
      loadProducts: jest.fn(),
      products: signal(mockProductsData)
    };

    mockRouter = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        ProductListComponent, 
        HttpClientTestingModule
      ],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    expect(mockProductService.loadProducts).toHaveBeenCalled();
  });

  it('should have products', () => {
    const products = component.filteredProducts();
    expect(products.length).toBeGreaterThan(0);
  });

  describe('Search Functionality', () => {
    it('should filter products based on search term', () => {
      component.updateSearch('Producto 1');
      const filteredProducts = component.filteredProducts();
      
      expect(filteredProducts.length).toBe(1);
      expect(filteredProducts[0].name).toBe('Producto 1');
    });

    it('should return all products when search term is empty', () => {
      component.updateSearch('');
      const filteredProducts = component.filteredProducts();
      
      expect(filteredProducts.length).toBe(2);
    });

    it('should handle case-insensitive search', () => {
      component.updateSearch('producto');
      const filteredProducts = component.filteredProducts();
      
      expect(filteredProducts.length).toBe(2);
    });
  });

  describe('Pagination', () => {
    it('should limit products based on page size', () => {
      component.updatePageSize('1');
      const filteredProducts = component.filteredProducts();
      
      expect(filteredProducts.length).toBe(1);
    });

    it('should update total results correctly', () => {
      component.updateSearch('Producto');
      const totalResults = component.totalResults();
      
      expect(totalResults).toBe(2);
    });

    it('should handle different page sizes', () => {
      component.updatePageSize('2');
      const filteredProducts = component.filteredProducts();
      
      expect(filteredProducts.length).toBe(2);
    });
  });

  describe('Navigation', () => {
    it('should navigate to create product page', () => {
      component.navigateToCreate();
      
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/products/create']);
    });

    it('should navigate to edit product page', () => {
      component.editProduct('1');
      
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/products/edit', '1']);
    });
  });

  describe('Dropdown Functionality', () => {
    it('should toggle dropdown for a product', () => {
      component.toggleDropdown('1');
      expect(component.activeDropdown).toBe('1');

      component.toggleDropdown('1');
      expect(component.activeDropdown).toBeNull();
    });

    it('should close dropdown when clicking outside', () => {
      const mockEvent = {
        target: document.createElement('div')
      } as unknown as MouseEvent;

      Object.defineProperty(mockEvent.target, 'closest', {
        value: jest.fn().mockReturnValue(null)
      });

      component.toggleDropdown('1');
      component.closeDropdown(mockEvent);
      
      expect(component.activeDropdown).toBeNull();
    });

    it('should not close dropdown when clicking inside dropdown', () => {
      const mockEvent = {
        target: document.createElement('div')
      } as unknown as MouseEvent;

      Object.defineProperty(mockEvent.target, 'closest', {
        value: jest.fn().mockReturnValue(document.createElement('div'))
      });

      component.toggleDropdown('1');
      component.closeDropdown(mockEvent);
      
      expect(component.activeDropdown).toBe('1');
    });
  });
});