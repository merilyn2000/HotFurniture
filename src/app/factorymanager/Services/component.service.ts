import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { NewProducts } from '../models/NewProducts';
import { Promotions } from '../models/Promotions';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor(private http: HttpClient) { }

  getProductForNewProducts(id: number) {
    return this.getAllProductsForNewProducts().pipe(
      map(productsArray => {
        return productsArray.find(p => p.Id === id)!;
      })
    );
  }

  getAllProductsForNewProducts(): Observable<NewProducts[]> {
    return this.http.get('data/newProducts.json').pipe(
      map(data => {
        const jsonData = JSON.stringify(data)
          const productsArray: Array<NewProducts> = JSON.parse(jsonData);
          return productsArray;
      })
    );
    return this.http.get<NewProducts[]>('data/newProducts.json');
  }

  getProductForPromotions(id: number) {
    return this.getAllProductsForPromotions().pipe(
      map(productsArray => {
        return productsArray.find(p => p.Id === id)!;
      })
    );
  }

  getAllProductsForPromotions(): Observable<Promotions[]> {
    return this.http.get('data/promotions.json').pipe(
      map(data => {
        const jsonData = JSON.stringify(data)
          const productsArray: Array<Promotions> = JSON.parse(jsonData);
          return productsArray;
      })
    );
    return this.http.get<Promotions[]>('data/promotions.json');
  }

}
