import { Component, Input } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { Product } from '../../types/product.type';
import { getImage } from '../../../utils/getImage.util';

@Component({
    selector:"app-cart-item",
  templateUrl: './cart-item.component.html',
  standalone: true,
  imports: [],
})
export class CartItemComponent {
  @Input() product!: Product;
  

  constructor(private cartService: CartService) {}
  increment(productId: number): void {
    this.cartService.incrementQuantity(productId);
  }

  decrement(productId: number): void {
    this.cartService.decrementQuantity(productId);
  }

  remove(productId: number): void {
    this.cartService.removeProductFromCart(productId);
  }

   getImageSrc(){
      return getImage(this.product.files[0].content)
    }
}
