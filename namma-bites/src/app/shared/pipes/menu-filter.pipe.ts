import { Pipe, PipeTransform } from '@angular/core';
import { MenuItem } from '../../core/models/menu-item.model';
import { FoodType } from '../../core/models/enums';

export interface MenuFilterOptions {
    category?: string;
    maxPrice?: number;
    vegOnly?: boolean;
}

@Pipe({
    name: 'menuFilter',
    standalone: true,
    pure: false
})
export class MenuFilterPipe implements PipeTransform {
    transform(items: MenuItem[], options: MenuFilterOptions): MenuItem[] {
        if (!items) return [];

        let filtered = [...items];

        if (options.category) {
            filtered = filtered.filter(item => item.category === options.category);
        }

        if (options.maxPrice != null && options.maxPrice > 0) {
            filtered = filtered.filter(item => item.price <= options.maxPrice!);
        }

        if (options.vegOnly) {
            filtered = filtered.filter(item => item.foodType === FoodType.Veg);
        }

        return filtered;
    }
}
