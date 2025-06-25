import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './localstorage.service';
import { Product } from '../types/product.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(0);
  public cartCount$ = this.cartCountSubject.asObservable();

  private totalPriceSubject = new BehaviorSubject<number>(0);
  public totalPrice$ = this.totalPriceSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const storedCart = this.localStorageService.getProductsStorage(
      environment.CART_KEY
    );
    if (storedCart) {
      this.cartItems = storedCart;
      this.cartItemsSubject.next(this.cartItems);
      this.cartCountSubject.next(this.getTotalQuantity());
      this.totalPriceSubject.next(this.getTotalPrice());
    }
  }

  addProductToCart(product: Product) {
    const existingProduct = this.cartItems.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }

    this.updateCartState();
  }

  removeProductFromCart(id: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== id);
    this.updateCartState();
  }

  clearCart() {
    this.cartItems = [];
    this.updateCartState();
  }

  getCartItems(): Product[] {
    return [...this.cartItems];
  }

  private updateCartState() {
    this.localStorageService.setProductsStorage(
      environment.CART_KEY,
      this.cartItems
    );
    this.cartItemsSubject.next(this.cartItems);
    this.cartCountSubject.next(this.getTotalQuantity());
    this.totalPriceSubject.next(this.getTotalPrice());
  }

  private getTotalQuantity(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    );
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      const quantity = item.quantity || 1;
      return total + item.price * quantity;
    }, 0);
  }

  incrementQuantity(id: number): number {
    const product = this.cartItems.find((item) => item.id === id);

    if (product) {
      product.quantity = (product.quantity || 1) + 1;
      this.updateCartState();
    }

    return this.getTotalPrice();
  }
  decrementQuantity(id: number): number {
    const product = this.cartItems.find((item) => item.id === id);

    if (product && (product.quantity || 1) > 1) {
      product.quantity = (product.quantity || 1) - 1;
      this.updateCartState();
    }

    return this.getTotalPrice();
  }
}
