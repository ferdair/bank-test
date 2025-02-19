import { Product } from './product.interface';

export interface ProductResponse {
    data: Product[];
}

export interface ApiResponse<T> {
    message: string;
    data: T;
}

export interface ProductCreateResponse {
    message: string;
    data: Product;
  }