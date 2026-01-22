import { Injectable } from '@angular/core';
import { Observable, interval, of } from 'rxjs';
import { finalize, map, takeWhile, tap } from 'rxjs/operators';
import { Order } from '../models/order.model';
import { OrderStatus } from '../models/enums';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private orders: Order[] = [];
  private lastOrder: Order | null = null;

  placeOrder(order: Order): Observable<Order> {
    const nextId = this.orders.length + 1;
    const placedOrder: Order = {
      ...order,
      id: nextId,
      placedAt: new Date().toISOString(),
    };
    this.orders.push(placedOrder);
    this.lastOrder = placedOrder;
    return of(placedOrder);
  }

  getLastOrder(): Order | null {
    return this.lastOrder;
  }

  getOrderById(orderId: number): Order | null {
    return this.orders.find((o) => o.id === orderId) ?? null;
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
      OrderStatus.Delivered,
    ];
    const startIndex = Math.max(statuses.indexOf(order.status), 0);

    return interval(1500).pipe(
      map((tick) => statuses[startIndex + tick] ?? statuses[statuses.length - 1]),
      takeWhile((_, index) => startIndex + index < statuses.length),
      tap((status) => {
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
