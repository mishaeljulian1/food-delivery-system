import { Injectable } from '@angular/core';
import { Observable, interval, of } from 'rxjs';
import { finalize, map, takeWhile, tap } from 'rxjs/operators';
import { Order } from '../models/order.model';
import { OrderStatus, PaymentMethod } from '../models/enums';
import { CartItem } from '../models/cart-item.model';
import { UserProfile } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private orders: Order[] = [];
  private lastOrder: Order | null = null;

  placeOrder(data: {
    user: UserProfile;
    items: CartItem[];
    totalAmount: number;
    paymentMethod: PaymentMethod;
    deliveryAddress: string;
  }): Observable<Order> {
    const restaurantId = data.items[0]?.item.restaurantId ?? 0;
    const nextId = this.orders.length + 1;
    const placedOrder: Order = {
      id: nextId,
      user: data.user,
      restaurantId,
      items: data.items,
      totalAmount: data.totalAmount,
      paymentMethod: data.paymentMethod,
      status: OrderStatus.Placed,
      placedAt: new Date().toISOString(),
      deliveryAddress: data.deliveryAddress
    };
    this.orders.push(placedOrder);
    this.lastOrder = placedOrder;
    return of(placedOrder);
  }

  getLastOrder(): Order | null {
    return this.lastOrder;
  }

  getOrderById(orderId: number): Order | null {
    return this.orders.find(o => o.id === orderId) ?? null;
  }

  updateStatusMockFlow(orderId: number): Observable<OrderStatus> {
    const order = this.getOrderById(orderId);
    if (!order) {
      return of(OrderStatus.Cancelled);
    }

    const statuses: OrderStatus[] = [
      OrderStatus.Placed,
      OrderStatus.Confirmed,
      OrderStatus.Preparing,
      OrderStatus.OutForDelivery,
      OrderStatus.Delivered
    ];
    const startIndex = Math.max(statuses.indexOf(order.status), 0);

    return interval(4000).pipe(
      map(tick => statuses[startIndex + tick] ?? statuses[statuses.length - 1]),
      takeWhile((_, index) => startIndex + index < statuses.length),
      tap(status => {
        order.status = status;
        this.lastOrder = order;
      }),
      finalize(() => {
        order.status = statuses[statuses.length - 1];
        this.lastOrder = order;
      })
    );
  }
}
