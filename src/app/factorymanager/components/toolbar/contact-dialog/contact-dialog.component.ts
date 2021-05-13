import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.css']
})
export class ContactDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ContactDialogComponent>) { }

  ngOnInit() {
  }

  Cancel() {
    this.dialogRef.close(null);
  }
}
