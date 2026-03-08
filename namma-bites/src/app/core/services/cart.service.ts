import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../models/cart-item.model';
import { MenuItem } from '../models/menu-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = new BehaviorSubject<CartItem[]>([]);

  readonly items$ = this._items.asObservable();
  readonly count$ = this._items.pipe(
    map(items => items.reduce((acc, item) => acc + item.quantity, 0))
  );
  readonly total$ = this._items.pipe(
    map(items => items.reduce((acc, item) => acc + item.total, 0))
  );

  private get items(): CartItem[] {
    return this._items.getValue();
  }

  addItem(menuItem: MenuItem): void {
    const current = [...this.items];
    const existing = current.find(cart => cart.item.id === menuItem.id);
    if (existing) {
      existing.quantity += 1;
      existing.total = existing.quantity * existing.item.price;
    } else {
      current.push({ item: menuItem, quantity: 1, total: menuItem.price });
    }
    this._items.next(current);
  }

  removeItem(menuItemId: number): void {
    this._items.next(this.items.filter(cart => cart.item.id !== menuItemId));
  }

  increaseQty(menuItemId: number): void {
    const current = [...this.items];
    const target = current.find(cart => cart.item.id === menuItemId);
    if (target) {
      target.quantity += 1;
      target.total = target.quantity * target.item.price;
      this._items.next(current);
    }
  }

  decreaseQty(menuItemId: number): void {
    const target = this.items.find(cart => cart.item.id === menuItemId);
    if (!target) return;
    if (target.quantity > 1) {
      const current = [...this.items];
      const t = current.find(c => c.item.id === menuItemId)!;
      t.quantity -= 1;
      t.total = t.quantity * t.item.price;
      this._items.next(current);
    } else {
      this.removeItem(menuItemId);
    }
  }

  clearCart(): void {
    this._items.next([]);
  }

  // Synchronous helpers for templates that don't subscribe
  getItems(): CartItem[] {
    return this._items.getValue();
  }

  getTotal(): number {
    return this.items.reduce((acc, item) => acc + item.total, 0);
  }

  getCount(): number {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }
}
