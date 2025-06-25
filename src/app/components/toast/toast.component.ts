import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Type } from '../../types/toast.type';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  @Input() message: string = '';
  @Input() errType: Type = 'none';
  @Input() visible: boolean = true;

  close() {
    this.visible = false;
  }
}
