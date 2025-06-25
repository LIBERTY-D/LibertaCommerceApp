import { Component, Input } from '@angular/core';

import { Product } from '../../types/product.type';
import { getImage } from '../../../utils/getImage.util';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() goToDetailsPage!: (id: number) => void;
  @Input() addProductToCart!: (productId: number) => void;

  getImageSrc() {
    return getImage(this.product.files[0].content);
  }
}
