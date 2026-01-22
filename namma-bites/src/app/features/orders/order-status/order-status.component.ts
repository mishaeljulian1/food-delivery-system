import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.css'
})
export class OrderStatusComponent {
  steps = ['Placed', 'Confirmed', 'Preparing', 'Out for delivery', 'Delivered'];
  currentIndex = 0;

  next(): void {
    if (this.currentIndex < this.steps.length - 1) {
      this.currentIndex += 1;
    }
  }
}
