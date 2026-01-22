import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MENU_ITEMS } from '../mock-data/menu.data';
import { MenuItem } from '../models/menu-item.model';

@Injectable({ providedIn: 'root' })
export class MenuService {
  getMenuByRestaurant(restaurantId: number): Observable<MenuItem[]> {
    const items = MENU_ITEMS.filter((item) => item.restaurantId === restaurantId);
    return of(items);
  }

  getCategories(restaurantId: number): Observable<string[]> {
    const categories = MENU_ITEMS.filter((item) => item.restaurantId === restaurantId)
      .map((item) => item.category)
      .filter((category, index, array) => array.indexOf(category) === index);
    return of(categories);
  }
}
