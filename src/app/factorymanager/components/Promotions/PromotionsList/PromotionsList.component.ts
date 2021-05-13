import { Component, OnInit } from '@angular/core';
import { IPromotions } from 'src/app/factorymanager/models/IPromotions';
import { ComponentService } from 'src/app/factorymanager/Services/component.service';

@Component({
  selector: 'app-PromotionsList',
  templateUrl: './PromotionsList.component.html',
  styleUrls: ['./PromotionsList.component.css']
})
export class PromotionsListComponent implements OnInit {
  Name = '';
  nameFilter = '';
  Sort = '';
  sortDirection = 'asc';
  promotions!: Array<IPromotions>;

  constructor(private componentService: ComponentService) { }

  ngOnInit(): void {
    this.componentService.getAllProductsForPromotions().subscribe(
      data => {
        this.promotions = data;
        console.log(data);
      } , error => {
        console.log(error);
      }
    )
  }

  NameFilter() {
    this.nameFilter = this.Name;
  }

  NameFilterClear() {
    this.nameFilter = '';
    this.Name = '';
  }

  SortDirection() {
    if (this.sortDirection === 'desc') {
      this.sortDirection = 'asc';
    } else {
      this.sortDirection = 'desc';
    }
  }

}
