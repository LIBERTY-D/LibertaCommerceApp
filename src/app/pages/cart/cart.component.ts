import { Component, OnDestroy, OnInit } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';

import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../types/product.type';
import { OrderService } from '../../services/order.service';
import { CreateOrderdDto, PaymentMethod } from '../../types/order.type';
import { User } from '../../types/user.type';
import { AuthService } from '../../services/auth-service.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, CommonModule],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit, OnDestroy {
  productsInCart: Product[] = [];
  cartItemsSubscription!: Subscription;
  cartTotalPriceSubscription!: Subscription;
  cartTotalPrice!: number;
  cartItemCount: number = 0;
  cartCountSubscription!: Subscription;
  loggedInUser: User | null = null;

  constructor(
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.fetchLoggenInUser();
    this.cartItemsSubscription = this.cartService.cartItems$.subscribe({
      next: (prodcts) => {
        this.productsInCart = prodcts;
      },
    });

    this.cartTotalPriceSubscription = this.cartService.totalPrice$.subscribe({
      next: (totalPrice) => {
        this.cartTotalPrice = totalPrice;
      },
    });

    this.cartCountSubscription = this.cartService.cartCount$.subscribe({
      next: (cartCount) => {
        this.cartItemCount = cartCount;
      },
    });
  }
  ngOnDestroy(): void {
    if (this.cartItemsSubscription) this.cartItemsSubscription.unsubscribe();
    if (this.cartTotalPriceSubscription)
      this.cartTotalPriceSubscription.unsubscribe();
    if (this.cartCountSubscription) this.cartCountSubscription.unsubscribe();
  }

  fetchLoggenInUser() {
    this.authService.currentUser$.subscribe({
      next: (user) => {
        this.loggedInUser = user;
      },
      error: (err) => {
        if (err.error) this.toastService.showToast(err.error.message, 'error');
        else this.toastService.showToast(err.message, 'error');
      },
    });
  }
  proceedToCheckOut() {
    // TODO: when working proper will add  real checkout
    if (!this.loggedInUser) {
      this.router.navigate(['', 'login']);
    } else {
      let order: CreateOrderdDto = {
        payment: {
          paymentMethod: PaymentMethod[PaymentMethod.CARD],
        },
        cartItems: this.productsInCart.map((prod) => {
          return { quantity: prod.quantity, productId: prod.id };
        }),
        userId: this.loggedInUser?.id,
      };
      // console.log(order)
      this.orderService.createOrder(order).subscribe({
        next: (res) => {
          this.toastService.showToast(res.message, 'success');
        },
        error: (err) => {
          if (err.error)
            this.toastService.showToast(err.error.message, 'error');
          else this.toastService.showToast(err.message, 'error');
        },
      });
    }
  }

  goToHomePage() {
    this.router.navigate(['']);
  }
}
