import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertifyService } from '../../Services/alertify.service';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  loggedinUser!: string;
  constructor(private alertifyService: AlertifyService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  loggedin() {
    this.loggedinUser =  localStorage.getItem('token')!;
    return this.loggedinUser;
  }

  logout() {
    localStorage.removeItem('token');
    this.alertifyService.warning('You are logged out !');
  }

  ContactDialog(): void {
    let dialogRef = this.dialog.open(ContactDialogComponent ,{
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(
      result => {
        console.log('Closed', result);
      }
    )
  }
}
