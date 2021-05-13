import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewProducts } from 'src/app/factorymanager/models/NewProducts';
import { ComponentService } from 'src/app/factorymanager/Services/component.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReviewDialogComponentPromotionsComponent } from '../ReviewDialogComponent-Promotions/ReviewDialogComponent-Promotions.component';
import { Promotions } from 'src/app/factorymanager/models/Promotions';
import { AddToCartDialogPromotionsComponent } from '../AddToCartDialog-Promotions/AddToCartDialog-Promotions.component';

@Component({
  selector: 'app-PromotionDetails',
  templateUrl: './PromotionDetails.component.html',
  styleUrls: ['./PromotionDetails.component.css']
})
export class PromotionDetailsComponent implements OnInit {

  public promotionId!: number;
  promotion = new Promotions();
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private compService: ComponentService,
    private dialog: MatDialog,
    private snack: MatSnackBar) { }

  ngOnInit() {
  this.promotionId = +this.route.snapshot.params['id'];

  this.route.params.subscribe(
  (params) => {
  this.promotionId = +params['id'];
  this.compService.getProductForNewPromotions(this.promotionId).subscribe(
  (data: Promotions) => {
    this.promotion = data;
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
  this.router.navigate(['promotions']);
  }

  ReviewDialog(): void {
  let dialogRef = this.dialog.open(ReviewDialogComponentPromotionsComponent ,{
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
    let dialogRef = this.dialog.open(AddToCartDialogPromotionsComponent ,{
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
