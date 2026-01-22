# NAMMA BITES – Step 1 & 2

Angular 17 single-page demo for “Namma Bites” covering the Step 1 (TypeScript models) and Step 2 (architecture + UI flow) requirements only.

## Run locally
1) Install deps: `npm install`
2) Start dev server: `ng serve -o`
3) App opens at `http://localhost:4200/restaurants`

## What’s included (per scope)
- Core models with enums, inheritance, access modifiers (Restaurant, MenuItem, Order, User/AppUser, BaseEntity)
- Mock data for restaurants + menus (static TS files)
- Services: RestaurantService (sync mock reads), CartService (in-memory cart)
- Components: navbar, restaurant-list, menu-list, cart, checkout (UI-only), order-status (UI placeholder)
- Routing: `/restaurants`, `/restaurants/:id/menu`, `/cart`, `/checkout`, `/order-status/:orderId`
- Basic bindings: `*ngIf`, `*ngFor`, `[ngClass]`, `[ngStyle]`, click handlers

## Not included (out of scope)
- HTTP/JSON server, live tracking, forms/validation, guards/interceptors, Angular Material, observables-based state
