import { Component } from '@angular/core';
import { AdminUserFormComponent } from '../../components/admin-user-form/admin-user-form.component';
import { AdminProductFormComponent } from '../../components/admin-product-form/admin-product-form.component';
import { AdminCategoryFormComponent } from '../../components/admin-category-form/admin-category-form.component';
import { AdminOrderViewComponent } from '../../components/admin-order-view/admin-order-view.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AdminProductFormComponent,
    AdminUserFormComponent,
    AdminCategoryFormComponent,
    AdminOrderViewComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
