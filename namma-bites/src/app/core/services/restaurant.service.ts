import { Injectable } from '@angular/core';
import { RESTAURANTS } from '../mock-data/restaurants.data';
import { MENU_ITEMS } from '../mock-data/menu.data';
import { Restaurant } from '../models/restaurant.model';
import { MenuItem } from '../models/menu-item.model';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  getRestaurants(): Restaurant[] {
    return RESTAURANTS;
  }

  getRestaurantById(id: number): Restaurant | undefined {
    return RESTAURANTS.find((r) => r.id === id);
  }

  getMenuByRestaurant(restaurantId: number): MenuItem[] {
    return MENU_ITEMS.filter((item) => item.restaurantId === restaurantId);
  }

  getMenuCategories(restaurantId: number): string[] {
    const categories = this.getMenuByRestaurant(restaurantId).map((item) => item.category);
    return Array.from(new Set(categories));
  }
}
