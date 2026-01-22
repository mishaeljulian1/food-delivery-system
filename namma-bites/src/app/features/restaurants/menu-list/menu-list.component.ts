import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RestaurantService } from '../../../core/services/restaurant.service';
import { Restaurant } from '../../../core/models/restaurant.model';
import { MenuItem } from '../../../core/models/menu-item.model';
import { CartService } from '../../../core/services/cart.service';
import { FoodType } from '../../../core/models/enums';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})
export class MenuListComponent implements OnInit {
  restaurant?: Restaurant;
  menuItems: MenuItem[] = [];
  categories: string[] = [];
  selectedCategory = '';
  fallbackImage =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='140'><rect width='100%' height='100%' fill='%23f4f4f4'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='16'>Image unavailable</text></svg>";

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.restaurant = this.restaurantService.getRestaurantById(id);
    this.menuItems = this.restaurantService.getMenuByRestaurant(id);
    this.categories = this.restaurantService.getMenuCategories(id);
    this.selectedCategory = this.categories[0] ?? '';
  }

  get filteredItems(): MenuItem[] {
    if (!this.selectedCategory) return this.menuItems;
    return this.menuItems.filter((item) => item.category === this.selectedCategory);
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
  }

  add(item: MenuItem): void {
    this.cartService.addItem(item);
  }

  increase(item: MenuItem): void {
    this.cartService.increaseQty(item.id);
  }

  decrease(item: MenuItem): void {
    this.cartService.decreaseQty(item.id);
  }

  onItemImgError(event: Event): void {
    (event.target as HTMLImageElement).src = this.fallbackImage;
  }

  quantity(itemId: number): number {
    const found = this.cartService.getItems().find((ci) => ci.item.id === itemId);
    return found ? found.quantity : 0;
  }

  vegColor(type: FoodType): string {
    if (type === FoodType.Veg) return '#2ecc71';
    if (type === FoodType.Egg) return '#f1c40f';
    return '#e74c3c';
  }
}
