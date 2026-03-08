import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';
import { PaymentMethod } from '../../../core/models/enums';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatCardModule, MatIconModule, MatDividerModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  isSubmitting = false;

  readonly paymentOptions = [
    { value: PaymentMethod.COD, label: 'Cash on Delivery' },
    { value: PaymentMethod.UPI, label: 'UPI' },
    { value: PaymentMethod.Card, label: 'Card / Net Banking' }
  ];

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      paymentMethod: [PaymentMethod.COD, Validators.required]
    });

    // Guard: redirect if cart is empty
    if (!this.cartService.getItems().length) {
      this.router.navigate(['/cart']);
    }
  }

  get subtotal(): number { return this.cartService.getTotal(); }
  get delivery(): number { return this.cartService.getItems().length ? 29 : 0; }
  get taxes(): number { return Math.round(this.subtotal * 0.05); }
  get total(): number { return this.subtotal + this.delivery + this.taxes; }

  // Convenience getters for template error messages
  get nameControl() { return this.checkoutForm.get('name')!; }
  get phoneControl() { return this.checkoutForm.get('phone')!; }
  get addressControl() { return this.checkoutForm.get('address')!; }

  placeOrder(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      this.snackBar.open('Please fill in all required fields correctly.', 'OK', { duration: 3000 });
      return;
    }

    this.isSubmitting = true;
    const formVal = this.checkoutForm.value;
    const user = {
      id: 1,
      fullName: formVal.name,
      email: '',
      phone: formVal.phone,
      defaultAddress: formVal.address
    };

    this.orderService.placeOrder({
      user,
      items: this.cartService.getItems(),
      totalAmount: this.total,
      paymentMethod: formVal.paymentMethod,
      deliveryAddress: formVal.address
    }).subscribe(order => {
      this.cartService.clearCart();
      this.snackBar.open('🎉 Order placed successfully!', '', { duration: 2500, panelClass: ['snack-success'] });
      this.router.navigate(['/order-status', order.id]);
    });
  }
}
