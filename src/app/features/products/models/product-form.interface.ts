import { Product } from './product.interface';

export interface ProductFormData extends Omit<Product, 'date_release' | 'date_revision'> {
    date_release: Date;
    date_revision: Date;
}

export interface ValidationErrors {
    id?: string[];
    name?: string[];
    description?: string[];
    logo?: string[];
    date_release?: string[];
    date_revision?: string[];
}