import { Routes } from '@angular/router';
import { RestaurantListComponent } from './features/restaurants/restaurant-list/restaurant-list.component';
import { MenuListComponent } from './features/restaurants/menu-list/menu-list.component';
import { CartComponent } from './features/orders/cart/cart.component';
import { CheckoutComponent } from './features/orders/checkout/checkout.component';
import { OrderStatusComponent } from './features/orders/order-status/order-status.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'restaurants', pathMatch: 'full' },
	{ path: 'restaurants', component: RestaurantListComponent },
	{ path: 'restaurants/:id/menu', component: MenuListComponent },
	{ path: 'cart', component: CartComponent },
	{ path: 'checkout', component: CheckoutComponent },
	{ path: 'order-status/:orderId', component: OrderStatusComponent },
	{ path: '**', redirectTo: 'restaurants' }
];
