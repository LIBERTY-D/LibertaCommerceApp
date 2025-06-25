import { Component } from '@angular/core';
import { ReviewsCardComponent } from '../../components/reviews-card/reviews-card.component';
import { reviews } from '../../types/review.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [ReviewsCardComponent, CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
})
export class ReviewsComponent {
  fetchReviews() {
    return reviews;
  }
}
