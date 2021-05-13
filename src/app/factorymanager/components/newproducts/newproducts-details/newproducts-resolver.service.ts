import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable, of } from 'rxjs';
import { NewProducts } from 'src/app/factorymanager/models/NewProducts';
import { ComponentService } from 'src/app/factorymanager/Services/component.service';

@Injectable({
  providedIn: 'root'
})
export class NewproductsResolverService implements Resolve<NewProducts> {

constructor(private router: Router,  private compService: ComponentService) { }

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<NewProducts> {
    const productId = route.params['id'];
    return this.compService.getProductForNewProducts(+productId);
  }
}
