import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-delete-modal',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './product-delete-modal.component.html'
})
export class ProductDeleteModalComponent {
  @Input() isOpen = false;
  @Input() productName = '';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
