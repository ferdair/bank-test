import { Product } from './product.interface';

export interface ProductResponse {
    data: Product[];
}

export interface ApiResponse {
    message: string;
    data?: any;
}