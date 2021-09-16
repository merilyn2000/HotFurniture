import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewProducts } from 'src/app/factorymanager/models/NewProducts';
import { ComponentService } from 'src/app/factorymanager/Services/component.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogNewProductsComponent } from '../review-dialog-newproducts/review-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddtocartDialogNewProductsComponent } from '../addtocart-dialog-newproducts/addtocart-dialog.component';
import { CartService } from 'src/app/factorymanager/Services/cart.service';
import { INewProducts } from 'src/app/factorymanager/models/INewProducts';

@Component({
  selector: 'app-newproducts-details',
  templateUrl: './newproducts-details.component.html',
  styleUrls: ['./newproducts-details.component.css']
})
export class NewproductsDetailsComponent implements OnInit {
  public productId!: number;
  newProduct = new NewProducts();
  // product: INewProducts | undefined;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages1!: NgxGalleryImage[];
  galleryImages2!: NgxGalleryImage[];
  galleryImages3!: NgxGalleryImage[];
  galleryImages4!: NgxGalleryImage[];
  galleryImages5!: NgxGalleryImage[];
  galleryImages6!: NgxGalleryImage[];


  constructor(private router: Router,
              private route: ActivatedRoute,
              private compService: ComponentService,
              private dialog: MatDialog,
              private snack: MatSnackBar,
              private cartService: CartService) { }

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

    this.galleryImages1 = [
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
    this.galleryImages2 = [
      {
        small: 'assets/images/7.jpg',
        medium: 'assets/images/7.jpg',
        big: 'assets/images/7.jpg',
      },
      {
        small: 'assets/images/8.jpg',
        medium: 'assets/images/8.jpg',
        big: 'assets/images/8.jpg',
      },
      {
        small: 'assets/images/9.jpg',
        medium: 'assets/images/9.jpg',
        big: 'assets/images/9.jpg',
      }
    ];
    this.galleryImages3 = [
      {
        small: 'assets/images/10.jpg',
        medium: 'assets/images/10.jpg',
        big: 'assets/images/10.jpg',
      },
      {
        small: 'assets/images/11.jpg',
        medium: 'assets/images/11.jpg',
        big: 'assets/images/11.jpg',
      },
      {
        small: 'assets/images/12.jpg',
        medium: 'assets/images/12.jpg',
        big: 'assets/images/12.jpg',
      }
    ];
    this.galleryImages4 = [
      {
        small: 'assets/images/14.jpg',
        medium: 'assets/images/14.jpg',
        big: 'assets/images/14.jpg',
      },
      {
        small: 'assets/images/13.jpg',
        medium: 'assets/images/13.jpg',
        big: 'assets/images/13.jpg',
      }
    ];
    this.galleryImages5 = [
      {
        small: 'assets/images/16.jpg',
        medium: 'assets/images/16.jpg',
        big: 'assets/images/16.jpg',
      },
      {
        small: 'assets/images/15.jpg',
        medium: 'assets/images/15.jpg',
        big: 'assets/images/15.jpg',
      }
    ];
    this.galleryImages6 = [
      {
        small: 'assets/images/17.jpg',
        medium: 'assets/images/17.jpg',
        big: 'assets/images/17.jpg',
      },
      {
        small: 'assets/images/18.jpg',
        medium: 'assets/images/18.jpg',
        big: 'assets/images/18.jpg',
      }
    ];
  }

  onBack() {
    this.router.navigate(['/']);
  }

  ReviewDialog(): void {
    let dialogRef = this.dialog.open(ReviewDialogNewProductsComponent ,{
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
    let dialogRef = this.dialog.open(AddtocartDialogNewProductsComponent ,{
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

  addToCart(product: NewProducts) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

}
