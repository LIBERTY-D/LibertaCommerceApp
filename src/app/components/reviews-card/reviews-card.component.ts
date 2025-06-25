import { Component, Input } from '@angular/core';
import { Review } from '../../types/review.type';

@Component({
  selector: 'app-reviews-card',
  standalone: true,
  imports: [],
  templateUrl: './reviews-card.component.html',
  styleUrl: './reviews-card.component.css',
})
export class ReviewsCardComponent {
  @Input() review!: Review;
}
