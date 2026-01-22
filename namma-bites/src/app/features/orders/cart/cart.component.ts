import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../../core/models/cart-item.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(private cartService: CartService, private router: Router) {}

  get items(): CartItem[] {
    return this.cartService.getItems();
  }

  get subtotal(): number {
    return this.cartService.getTotal();
  }

  get deliveryFee(): number {
    return this.items.length ? 29 : 0;
  }

  get taxes(): number {
    return Math.round(this.subtotal * 0.05);
  }

  get grandTotal(): number {
    return this.subtotal + this.deliveryFee + this.taxes;
  }

  increase(id: number): void {
    this.cartService.increaseQty(id);
  }

  decrease(id: number): void {
    this.cartService.decreaseQty(id);
  }

  remove(id: number): void {
    this.cartService.removeItem(id);
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
