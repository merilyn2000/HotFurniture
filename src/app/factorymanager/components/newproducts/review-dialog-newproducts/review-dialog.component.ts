import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css']
})
export class ReviewDialogNewProductsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ReviewDialogNewProductsComponent>) { }

  ngOnInit() {
  }

  Save() {
    this.dialogRef.close(null);
  }

  Cancel() {
    this.dialogRef.close(null);
  }
}
