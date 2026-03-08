import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RestaurantService } from '../../../core/services/restaurant.service';
import { CartService } from '../../../core/services/cart.service';
import { Restaurant } from '../../../core/models/restaurant.model';
import { MenuItem } from '../../../core/models/menu-item.model';
import { FoodType } from '../../../core/models/enums';
import { MenuFilterPipe } from '../../../shared/pipes/menu-filter.pipe';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    MatCardModule, MatButtonModule, MatIconModule, MatChipsModule,
    MatDividerModule, MatSlideToggleModule,
    MenuFilterPipe
  ],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})
export class MenuListComponent implements OnInit {
  restaurant?: Restaurant;
  menuItems: MenuItem[] = [];
  categories: string[] = [];
  selectedCategory = '';
  vegOnly = false;
  fallbackImage = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><rect width='100%' height='100%' fill='%23f5f5f5'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23ccc' font-size='32'>🍴</text></svg>";

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.restaurant = this.restaurantService.getRestaurantById(id);
    this.menuItems = this.restaurantService.getMenuByRestaurant(id);
    this.categories = this.restaurantService.getMenuCategories(id);
    this.selectedCategory = this.categories[0] ?? '';
  }

  get filterOptions() {
    return { category: this.selectedCategory, vegOnly: this.vegOnly };
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
  }

  add(item: MenuItem): void {
    this.cartService.addItem(item);
    this.snackBar.open(`${item.name} added to cart!`, 'OK', {
      duration: 2000,
      panelClass: ['snack-success']
    });
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
    const found = this.cartService.getItems().find(ci => ci.item.id === itemId);
    return found ? found.quantity : 0;
  }

  vegColor(type: FoodType): string {
    if (type === FoodType.Veg) return '#2ecc71';
    if (type === FoodType.Egg) return '#f1c40f';
    return '#e74c3c';
  }
}
