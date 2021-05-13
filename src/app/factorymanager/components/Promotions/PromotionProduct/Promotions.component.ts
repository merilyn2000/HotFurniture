import { Component, Input, OnInit } from '@angular/core';
import { IPromotions } from 'src/app/factorymanager/models/IPromotions';

@Component({
  selector: 'app-Promotions',
  templateUrl: './Promotions.component.html',
  styleUrls: ['./Promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  @Input() promotions!: IPromotions

  constructor() { }

  ngOnInit() {
  }

}
