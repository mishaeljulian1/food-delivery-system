import { MenuItem } from './menu-item.model';

export interface CartItem {
  item: MenuItem;
  quantity: number;
  total: number;
}
