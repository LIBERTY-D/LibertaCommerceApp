import { ApiResponse } from './base.type';
import { Category } from './category.type';
import { Payment } from './payment.type';

export type CreateProductdDto = {
  quantity: number;
  price: number;
  name: string;
  description: string;
  categoryId: number;
};

//  Purchased product model
export type PurchasedProduct = {
  productId: number;
  name: string;
  description: string;
  qty: number;
  totalPrice: number;
  price: number;
  imageUrl: string;
  category: Category;
  payment: Payment;
};

// Product

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  files:File [];
  orderItems: [];
};

export type File = {
  content: string;
  contentType: string;
  fileName: string;
  id: number;
  size: number;
};
export type ProductResponse = ApiResponse<Product[]>;
export type SingleProductResponse = ApiResponse<Product>;
