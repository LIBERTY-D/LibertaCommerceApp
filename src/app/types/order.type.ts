import { ApiResponse, ApiResponseOrder } from './base.type';
import { PurchasedProduct } from './product.type';

export interface OrderPurchase {
  purchasedProduct: {
    productId: number;
    name: string;
    description: string;
    qty: number;
    totalPrice: number;
    price: number;
    imageUrl: string;
    category: {
      name: string;
    };
    payment: {
      id: number;
      amount: number;
      paymentDate: string;
      paymentMethod: PaymentMethod;
      paymentStatus: PaymentStatus;
    };
  };
}

export type OrderResponse = ApiResponse<Order[]>;
export type SingleOrderResponse = ApiResponseOrder<Order[]>;


export type CartItems = {
  quantity: number;
  productId: number;
};

export enum PaymentMethod {
  CARD,
  PAYPAL,
  CASH,
}

export type CreateOrderdDto = {
  payment: {
    paymentMethod: PaymentMethod|string;
  };
  cartItems: CartItems[];
  userId: number;
};

export type PaymentStatus= 'PENDING'| 'COMPLETED'|'FAILED'|'CANCELLED'|'REFUNDED'


//Order model
export type Order= {
  purchasedProduct: PurchasedProduct;
};