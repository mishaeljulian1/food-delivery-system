import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { MenuItem } from '../models/menu-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[] = [];

  addItem(menuItem: MenuItem): void {
    const existing = this.items.find((cart) => cart.item.id === menuItem.id);
    if (existing) {
      existing.quantity += 1;
      existing.total = existing.quantity * existing.item.price;
      return;
    }
    this.items.push({ item: menuItem, quantity: 1, total: menuItem.price });
  }

  removeItem(menuItemId: number): void {
    this.items = this.items.filter((cart) => cart.item.id !== menuItemId);
  }

  increaseQty(menuItemId: number): void {
    const target = this.items.find((cart) => cart.item.id === menuItemId);
    if (target) {
      target.quantity += 1;
      target.total = target.quantity * target.item.price;
    }
  }

  decreaseQty(menuItemId: number): void {
    const target = this.items.find((cart) => cart.item.id === menuItemId);
    if (!target) return;

    if (target.quantity > 1) {
      target.quantity -= 1;
      target.total = target.quantity * target.item.price;
    } else {
      this.removeItem(menuItemId);
    }
  }

  clearCart(): void {
    this.items = [];
  }

  getItems(): CartItem[] {
    return this.items;
  }

  getTotal(): number {
    return this.items.reduce((acc, item) => acc + item.total, 0);
  }

  getCount(): number {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }
}
