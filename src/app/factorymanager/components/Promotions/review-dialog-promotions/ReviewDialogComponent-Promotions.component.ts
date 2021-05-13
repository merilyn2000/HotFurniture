import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ReviewDialogComponent-Promotions',
  templateUrl: './ReviewDialogComponent-Promotions.component.html',
  styleUrls: ['./ReviewDialogComponent-Promotions.component.css']
})
export class ReviewDialogPromotionsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ReviewDialogPromotionsComponent>) { }

  ngOnInit() {
  }

  Save() {
    this.dialogRef.close(null);
  }

  Cancel() {
    this.dialogRef.close(null);
  }
}
