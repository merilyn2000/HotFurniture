import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addtocart-dialog',
  templateUrl: './addtocart-dialog.component.html',
  styleUrls: ['./addtocart-dialog.component.css']
})
export class AddtocartDialogNewProductsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddtocartDialogNewProductsComponent>) { }

  ngOnInit() {
  }

  Yes() {
    this.dialogRef.close(null);
  }

  No() {
    this.dialogRef.close(null);
  }
}
