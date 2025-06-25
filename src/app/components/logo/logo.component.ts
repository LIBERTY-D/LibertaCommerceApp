import { Component } from '@angular/core';
import { LinkComponent } from '../link/link.component';

@Component({
  standalone: true,
  selector: 'app-logo',
  imports: [LinkComponent],
  templateUrl: './logo.component.html',
})
export class LogoComponent {}
