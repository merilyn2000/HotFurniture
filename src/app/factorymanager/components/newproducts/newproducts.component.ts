import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { INewProducts } from '../../models/INewProducts';
import { AddtocartDialogNewProductsComponent } from './addtocart-dialog-newproducts/addtocart-dialog.component';

@Component({
  selector: 'app-newproducts',
  templateUrl: './newproducts.component.html',
  styleUrls: ['./newproducts.component.css']
})
export class NewproductsComponent implements OnInit {
  @Input() newProduct! : INewProducts

  constructor(private dialog: MatDialog,
              private snack: MatSnackBar) { }

  ngOnInit() {
  }

  AddToCartDialog(): void {
    let dialogRef = this.dialog.open(AddtocartDialogNewProductsComponent ,{
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(
      result => {
        console.log('Closed', result);
        if(result == null) {
          this.openSnackBar("You added successfully one item to cart !","Close");
        }
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this.snack.open(message, action,
      {
        duration: 3000,
      });
  }
}
