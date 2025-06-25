import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-link',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './link.component.html',
})
export class LinkComponent {
  @Input() linkPath!: String;
  @Input() isLogo: boolean = false;
}
