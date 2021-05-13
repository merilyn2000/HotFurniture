import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-AddToCartDialog-Promotions',
  templateUrl: './AddToCartDialog-Promotions.component.html',
  styleUrls: ['./AddToCartDialog-Promotions.component.css']
})
export class AddToCartDialogPromotionsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddToCartDialogPromotionsComponent>) { }

  ngOnInit() {
  }

  Yes() {
    this.dialogRef.close(null);
  }

  No() {
    this.dialogRef.close(null);
  }
}
