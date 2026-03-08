import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/models/order.model';
import { OrderStatus } from '../../../core/models/enums';

interface StatusStep {
  label: string;
  icon: string;
  status: OrderStatus;
}

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatDividerModule],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.css'
})
export class OrderStatusComponent implements OnInit, OnDestroy {
  order: Order | null = null;
  currentStatus: OrderStatus = OrderStatus.Placed;
  isCompleted = false;
  private sub?: Subscription;

  readonly steps: StatusStep[] = [
    { label: 'Order Placed', icon: 'check_circle', status: OrderStatus.Placed },
    { label: 'Confirmed', icon: 'thumb_up', status: OrderStatus.Confirmed },
    { label: 'Preparing', icon: 'restaurant', status: OrderStatus.Preparing },
    { label: 'Out for Delivery', icon: 'delivery_dining', status: OrderStatus.OutForDelivery },
    { label: 'Delivered', icon: 'home', status: OrderStatus.Delivered }
  ];

  readonly statusOrder: OrderStatus[] = [
    OrderStatus.Placed,
    OrderStatus.Confirmed,
    OrderStatus.Preparing,
    OrderStatus.OutForDelivery,
    OrderStatus.Delivered
  ];

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('orderId');
    const orderId = idParam === 'last' ? this.orderService.getLastOrder()?.id ?? 0 : Number(idParam);
    this.order = this.orderService.getOrderById(orderId);

    if (!this.order) {
      // Try last order as fallback
      this.order = this.orderService.getLastOrder();
    }

    if (this.order) {
      this.currentStatus = this.order.status;
      this.sub = this.orderService.updateStatusMockFlow(this.order.id).subscribe({
        next: status => { this.currentStatus = status; },
        complete: () => {
          this.currentStatus = OrderStatus.Delivered;
          this.isCompleted = true;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get currentStepIndex(): number {
    return this.statusOrder.indexOf(this.currentStatus);
  }

  isStepActive(step: StatusStep): boolean {
    return this.statusOrder.indexOf(step.status) <= this.currentStepIndex;
  }

  isCurrentStep(step: StatusStep): boolean {
    return step.status === this.currentStatus;
  }

  get progressPercent(): number {
    return Math.round((this.currentStepIndex / (this.statusOrder.length - 1)) * 100);
  }
}
