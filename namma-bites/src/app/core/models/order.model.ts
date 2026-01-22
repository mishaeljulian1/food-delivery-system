import { CartItem } from './cart-item.model';
import { OrderStatus, PaymentMethod } from './enums';
import { UserProfile } from './user.model';

export interface Order {
  id: number;
  user: UserProfile;
  restaurantId: number;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  placedAt: string;
  deliveryAddress: string;
}
