import { CuisineType } from './enums';

export interface Restaurant {
  id: number;
  name: string;
  rating: number;
  cuisines: CuisineType[];
  priceForTwo: number;
  deliveryTimeMins: number;
  distanceKm: number;
  imageUrl?: string;
  address: string;
  isPureVeg: boolean;
  offers?: string;
}
