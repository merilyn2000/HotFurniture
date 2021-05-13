import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewProducts } from 'src/app/factorymanager/models/NewProducts';
import { ComponentService } from 'src/app/factorymanager/Services/component.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddtocartDialogComponent } from '../addtocart-dialog/addtocart-dialog.component';

@Component({
  selector: 'app-newproducts-details',
  templateUrl: './newproducts-details.component.html',
  styleUrls: ['./newproducts-details.component.css']
})
export class NewproductsDetailsComponent implements OnInit {
  public productId!: number;
  newProduct = new NewProducts();
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private compService: ComponentService,
              private dialog: MatDialog,
              private snack: MatSnackBar) { }

  ngOnInit() {
    this.productId = +this.route.snapshot.params['id'];

    this.route.params.subscribe(
      (params) => {
        this.productId = +params['id'];
        this.compService.getProductForNewProducts(this.productId).subscribe(
          (data: NewProducts) => {
            this.newProduct = data;
            // also the resolver does notwork
          }
        )
      }
    );

    this.galleryOptions = [
      {
        width: '100%',
        height: '450px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/images/1.jpg',
        medium: 'assets/images/1.jpg',
        big: 'assets/images/1.jpg',
      },
      {
        small: 'assets/images/2.jpg',
        medium: 'assets/images/2.jpg',
        big: 'assets/images/2.jpg',
      },
      {
        small: 'assets/images/3.jpg',
        medium: 'assets/images/3.jpg',
        big: 'assets/images/3.jpg',
      },
      {
        small: 'assets/images/4.jpg',
        medium: 'assets/images/4.jpg',
        big: 'assets/images/4.jpg',
      },
      {
        small: 'assets/images/5.jpg',
        medium: 'assets/images/5.jpg',
        big: 'assets/images/5.jpg',
      }
    ];
  }

  onBack() {
    this.router.navigate(['/']);
  }

  ReviewDialog(): void {
    let dialogRef = this.dialog.open(ReviewDialogComponent ,{
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(
      result => {
        console.log('Closed', result);
        if(result == null) {
          this.openSnackBarReview("Review added succesfully !","Close");
        }
      }
    )
  }

  openSnackBarReview(message: string, action: string) {
    this.snack.open(message, action,
      {
        duration: 3000,
      });
  }

  AddToCartDialog(): void {
    let dialogRef = this.dialog.open(AddtocartDialogComponent ,{
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(
      result => {
        console.log('Closed', result);
        if(result == null) {
          this.openSnackBarCart("You added successfully one item to cart !","Close");
        }
      }
    )
  }

  openSnackBarCart(message: string, action: string) {
    this.snack.open(message, action,
      {
        duration: 3000,
      });
  }

}
