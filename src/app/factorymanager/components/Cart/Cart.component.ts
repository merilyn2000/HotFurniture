import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-Cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.css']
})
export class CartComponent implements OnInit {
  products = this.cartService.getItems();

  constructor(private cartService: CartService) { }

  caca() {
    console.log(this.products);
  }

  ngOnInit() {
  }

}
