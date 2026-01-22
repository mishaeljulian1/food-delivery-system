import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  paymentMethod: 'COD' | 'UPI' | 'CARD' = 'COD';

  constructor(private cartService: CartService, private router: Router) {}

  get subtotal(): number {
    return this.cartService.getTotal();
  }

  get delivery(): number {
    return this.cartService.getItems().length ? 29 : 0;
  }

  get taxes(): number {
    return Math.round(this.subtotal * 0.05);
  }

  get total(): number {
    return this.subtotal + this.delivery + this.taxes;
  }

  selectPayment(method: 'COD' | 'UPI' | 'CARD'): void {
    this.paymentMethod = method;
  }

  placeOrder(): void {
    this.cartService.clearCart();
    this.router.navigate(['/order-status/last']);
  }
}
