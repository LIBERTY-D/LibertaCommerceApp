import { Component } from '@angular/core';
import { CheckoutDetailsComponent } from '../../components/checkout-details/checkout-details.component';

@Component({
  selector: 'app-checkout-details-page',
  templateUrl: './checkout-details.page.html',
  standalone: true,
  imports: [CheckoutDetailsComponent],
})
export class CheckoutDetailsPage {
  handleCheckoutDetails(formData: any) {
  
    // TODO: Save to order service, then redirect to payment gateway
  }
}
