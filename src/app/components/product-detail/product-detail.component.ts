import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../types/product.type';
import { getImage } from '../../../utils/getImage.util';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  @Input() product: Product | undefined;

  constructor(private cartService: CartService) {}

  getImageSrc() {
    if (this.product) return getImage(this.product.files[0].content);
    return '';
  }

  addProductToCart = (productToAdd: Product | undefined) => {
    if (productToAdd) this.cartService.addProductToCart(productToAdd);
  };
}
