import { FoodType } from './enums';

export interface MenuItem {
  id: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  foodType: FoodType;
  spiceLevel?: 'Mild' | 'Medium' | 'Spicy';
  imageUrl?: string;
  category: string;
  isBestSeller: boolean;
  rating?: number;
}
