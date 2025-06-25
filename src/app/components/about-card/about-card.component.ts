import { Component, Input } from '@angular/core';
import { About } from '../../types/about.type';

@Component({
  selector: 'app-about-card',
  standalone: true,
  imports: [],
  templateUrl: './about-card.component.html',
  styleUrl: './about-card.component.css'
})
export class AboutCardComponent {

  @Input() about!:About
}
