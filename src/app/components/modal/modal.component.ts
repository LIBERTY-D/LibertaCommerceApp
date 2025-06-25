import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() message: string = 'Are you sure?';
  @Input() onConfirmCallback!: () => void;
  @Input() onCancelCallback!: () => void;

  onConfirm() {
    this.onConfirmCallback?.();
  }

  onCancel() {
    this.onCancelCallback?.();
  }
}
