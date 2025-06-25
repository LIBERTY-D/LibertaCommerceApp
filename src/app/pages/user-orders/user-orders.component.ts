import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderCardComponent } from '../../components/order-card/order-card.component';
import { Order, PaymentMethod } from '../../types/order.type';
import { User } from '../../types/user.type';
import { AuthService } from '../../services/auth-service.service';
import { ToastData } from '../../types/toast.type';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [OrderCardComponent, CommonModule],
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent implements OnInit {
  userOrders: Order[] | undefined = [];
  loggedInUser: User | null = null;

  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.fetchUserOrders();
  }
  ngOnInit() {}

  fetchUserOrders() {
    this.fetchLoggenInUser();
  }

  fetchLoggenInUser() {
    this.authService.currentUser$.subscribe({
      next: (user) => {
        if (user) {
          this.toastService.showToast('orders fetched', 'success');
          this.loggedInUser = user;
          this.userOrders = user?.orders;
        }
      },
      error: (err) => {
        if (err.error) this.toastService.showToast(err.error.message, 'error');
        else this.toastService.showToast(err.message, 'error');
      },
    });
  }
}
