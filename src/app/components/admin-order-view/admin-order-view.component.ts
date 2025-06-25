import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Order } from '../../types/order.type';
import { OrderCardComponent } from '../order-card/order-card.component';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-admin-order-view',
  standalone: true,
  imports: [OrderCardComponent, CommonModule],
  templateUrl: './admin-order-view.component.html',
})
export class AdminOrderViewComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}
  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        this.orders = res.data;
      },
      error: (err) => {
        // console.log(err);
      },
    });
    
  }
}
