import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../../core/models/cart-item.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  items$ = this.cartService.items$;

  constructor(private cartService: CartService, private router: Router, private snackBar: MatSnackBar) { }

  get items(): CartItem[] { return this.cartService.getItems(); }
  get subtotal(): number { return this.cartService.getTotal(); }
  get deliveryFee(): number { return this.items.length ? 29 : 0; }
  get taxes(): number { return Math.round(this.subtotal * 0.05); }
  get grandTotal(): number { return this.subtotal + this.deliveryFee + this.taxes; }

  increase(id: number): void { this.cartService.increaseQty(id); }
  decrease(id: number): void { this.cartService.decreaseQty(id); }

  remove(id: number, name: string): void {
    this.cartService.removeItem(id);
    this.snackBar.open(`${name} removed from cart`, '', { duration: 1800 });
  }

  goToCheckout(): void { this.router.navigate(['/checkout']); }
}
