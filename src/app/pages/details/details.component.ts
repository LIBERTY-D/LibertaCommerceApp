import { Component, inject, OnInit } from '@angular/core';
import { ProductDetailComponent } from '../../components/product-detail/product-detail.component';

import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../types/product.type';
import { ProductService } from '../../services/product.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ProductDetailComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  products: Product[] = [];

  product!: Product;
  activeRouter: ActivatedRoute = inject(ActivatedRoute);

  constructor(
    private productService: ProductService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.fetchAllProducts();
  }

  fetchAllProducts = () => {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products.data;
        let params: Params = this.activeRouter.snapshot.params;
        let productId: number = +params['productId'];
        this.product = this.products.filter((prod) => prod.id == productId)[0];
      },
      error: (err) => {
        this.toastService.showToast('error fetching data', 'error');
      },
    });
  };
}
