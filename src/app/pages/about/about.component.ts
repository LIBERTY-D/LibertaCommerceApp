import { Component } from '@angular/core';
import { AboutCardComponent } from '../../components/about-card/about-card.component';
import { About } from '../../types/about.type';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AboutCardComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  data: About = {
    username: 'Liberty Mukubvu',
    position: 'Owner and CEO of Liberta',
    imageSrc: '',
  };
}
