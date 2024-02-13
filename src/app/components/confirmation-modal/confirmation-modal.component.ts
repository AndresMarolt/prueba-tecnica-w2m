import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
})
export class ConfirmationModalComponent {
  @Input() title = '';
  @Input() text = '';
  @Output() confirmEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModalEvent: EventEmitter<void> = new EventEmitter<void>();

  submit() {
    this.confirmEvent.emit();
    this.closeModal();
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}
