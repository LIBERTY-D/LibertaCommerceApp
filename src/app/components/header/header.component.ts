import { Component, OnDestroy, OnInit } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { LinkComponent } from '../link/link.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth-service.service';
import { LoginResponse, User } from '../../types/user.type';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [CommonModule, LogoComponent, LinkComponent, RouterLink],
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  cartCountSubscription!: Subscription;
  loggedInUser: User | null = null;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.fetchLoggenInUser();
    this.cartCountSubscription = this.cartService.cartCount$.subscribe({
      next: (cartCount) => {
        this.cartItemCount = cartCount;
      },
    });
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
  loginAsDemoUser() {
    let email: string = 'demo@gmail.com';
    let password: string = 'demo1234';
    this.userService.loginUser({ email, password }).subscribe({
      next: (data: LoginResponse) => {
        this.toastService.showToast(data.message, 'success');
        this.localStorageService.setAuth(environment.LIBERTA_AUTH_KEY, data);
        this.router.navigate(['/']);
      },
      error: (err) => {
        let error = err.error;
        if (error) {
          this.toastService.showToast(error.message, 'error');
        } else {
          this.toastService.showToast(err.message, 'error');
        }
      },
    });
  }

  onCartClick() {
    this.router.navigate(['', 'cart']);
  }
  showNavOnMobilePhones: boolean = false;

  onShowNavOnMobilePhones() {
    this.showNavOnMobilePhones = !this.showNavOnMobilePhones;
  }

  ngOnDestroy(): void {
    if (this.cartCountSubscription) this.cartCountSubscription.unsubscribe();
  }
}
