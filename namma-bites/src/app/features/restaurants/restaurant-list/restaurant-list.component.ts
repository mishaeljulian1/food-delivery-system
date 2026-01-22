import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RestaurantService } from '../../../core/services/restaurant.service';
import { Restaurant } from '../../../core/models/restaurant.model';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.css'
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];
  fallbackImage =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'><rect width='100%' height='100%' fill='%23f4f4f4'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='18'>Image unavailable</text></svg>";

  constructor(private restaurantService: RestaurantService, private router: Router) {}

  ngOnInit(): void {
    this.restaurants = this.restaurantService.getRestaurants();
  }

  ratingClass(rating: number): string {
    if (rating >= 4.2) return 'rating-high';
    if (rating >= 3.8) return 'rating-mid';
    return 'rating-low';
  }

  onRestaurantImgError(event: Event): void {
    (event.target as HTMLImageElement).src = this.fallbackImage;
  }

  viewMenu(id: number): void {
    this.router.navigate(['/restaurants', id, 'menu']);
  }
}
