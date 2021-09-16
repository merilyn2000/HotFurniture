import { Injectable } from '@angular/core';
import { NewProducts } from '../models/NewProducts';

@Injectable({
  providedIn: 'root'
})
export class CartService {

constructor() { }
  products: NewProducts[] = [];

  addToCart(product: NewProducts) {
    this.products.push(product);
  }

  getItems() {
    return this.products;
  }

  clearCart() {
    this.products = [];
    return this.products;
  }
}
