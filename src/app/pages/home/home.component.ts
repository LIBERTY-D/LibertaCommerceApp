import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsComponent } from '../reviews/reviews.component';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { Product } from '../../types/product.type';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth-service.service';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    ProductCardComponent,
    ReviewsComponent,
    LoaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  searchText: string = '';
  queryValue: string = '';
  products: Product[] = [];
  filteredProduct: Product[] = [];
  private fragmentSubscription!: Subscription;
  isLoading: boolean =true;

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService,
    private authService: AuthService
  ) {}
  ngAfterViewInit(): void {
    this.fragmentSubscription = this.activeRouter.fragment.subscribe(
      (value) => {
        if (value) {
          setTimeout(() => {
            const element = document.getElementById(value);
            if (element) {
              const yOffset = -80;
              const y =
                element.getBoundingClientRect().top + window.scrollY + yOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }, 100);
        }
      }
    );
  }
  ngOnInit(): void {
    this.authService.loadUserFromToken();
    this.fetchAllProducts();
    // query param
    this.activeRouter.queryParams.subscribe(({ name }) => {
      this.queryValue = name;
      if (name) {
        this.filteredProduct = this.products.filter((prod) =>
          prod.name.toLowerCase().startsWith(name.toLocaleLowerCase())
        );
      } else {
        this.queryValue = '';
      }
    });
  }

  onSearchProductChange(searchText: string) {
    this.searchText = searchText;
    this.filteredProduct = this.products.filter((prod) =>
      prod.name.toLowerCase().startsWith(this.searchText.toLocaleLowerCase())
    );
  }

  goToDetailsPage = (productId: number) => {
    this.router.navigate(['details', 'detail', `${productId}`]);
  };

  addProductToCart = (productId: number) => {
    let cartProduct = this.products.find((product) => product.id == productId);
    if (cartProduct) this.cartService.addProductToCart(cartProduct);
  };

  fetchAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products.data;
        this.isLoading= false
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.fragmentSubscription) {
      this.fragmentSubscription.unsubscribe();
    }
  }
}
