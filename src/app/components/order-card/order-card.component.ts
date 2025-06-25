import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../types/order.type';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css'
})
export class OrderCardComponent {

  @Input() order:Order|undefined;
}
