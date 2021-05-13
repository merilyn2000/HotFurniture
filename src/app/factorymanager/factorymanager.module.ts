import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactorymanagerAppComponent } from './factorymanager-app.component';
import { MaterialModule } from '../shared/material.module';
import { TreeComponent } from './components/tree/tree.component';
import { Routes, RouterModule } from '@angular/router';
import { NewproductsComponent } from './components/newproducts/newproducts.component';
import { BedsComponent } from './components/Beds/Beds.component';
import { ChairsComponent } from './components/Chairs/Chairs.component';
import { TablesComponent } from './components/Tables/Tables.component';
import { CouchesComponent } from './components/Couches/Couches.component';
import { CabinetsAndFurnitureComponent } from './components/CabinetsAndFurniture/CabinetsAndFurniture.component';
import { SeatsComponent } from './components/Seats/Seats.component'
import { StorageSystemsComponent } from './components/StorageSystems/StorageSystems.component';
import { ComponentService } from './Services/component.service';
import { NewproductsDetailsComponent } from './components/newproducts/newproducts-details/newproducts-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NewproductsResolverService } from './components/newproducts/newproducts-details/newproducts-resolver.service';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserService } from './Services/user.service';
import { AlertifyService } from './Services/alertify.service';
import { AuthService } from './Services/auth.service';
import { ReviewDialogNewProductsComponent } from './components/newproducts/review-dialog-newproducts/review-dialog.component';
import { PromotionsProductComponent } from './components/Promotions/promotions-product/Promotions.component';
import { PromotionsListComponent } from './components/Promotions/promotions-list/PromotionsList.component';
import { ContactDialogComponent } from './components/toolbar/contact-dialog/contact-dialog.component';
import { AddtocartDialogNewProductsComponent } from './components/newproducts/addtocart-dialog-newproducts/addtocart-dialog.component';
import { PromotionDetailsComponent } from './components/Promotions/promotions-details/PromotionDetails.component';
import { ReviewDialogPromotionsComponent } from './components/Promotions/review-dialog-promotions/ReviewDialogComponent-Promotions.component';
import { AddToCartDialogPromotionsComponent } from './components/Promotions/addtocart-dialog-promotions/AddToCartDialog-Promotions.component';


const routes: Routes = [
  {path:'home', component: FactorymanagerAppComponent },
  {path:'new-products', component: NewproductsComponent},
  {path:'chairs', component: ChairsComponent},
  {path:'tables', component: TablesComponent},
  {path:'couches', component: CouchesComponent},
  {path:'beds', component: BedsComponent},
  {path:'cabinets-furniture', component: CabinetsAndFurnitureComponent},
  {path:'seats', component: SeatsComponent},
  {path:'storage-systems', component: StorageSystemsComponent},
  {path:'newproducts-details/:id', component: NewproductsDetailsComponent, resolve:{prp: NewproductsResolverService}},
  {path:'page-not-found', component: PageNotFoundComponent},
  {path:'user-login', component: UserLoginComponent},
  {path:'user-register', component: UserRegisterComponent},
  {path:'promotions', component: PromotionsListComponent},
  {path:'promotions-details/:id', component: PromotionDetailsComponent}
];

@NgModule({
  declarations: [
    FactorymanagerAppComponent,
    TreeComponent,
    NewproductsComponent,
    BedsComponent,
    ChairsComponent,
    TablesComponent,
    CouchesComponent,
    CabinetsAndFurnitureComponent,
    SeatsComponent,
    StorageSystemsComponent,
    NewproductsDetailsComponent,
    FilterPipe,
    SortPipe,
    UserLoginComponent,
    UserRegisterComponent,
    ReviewDialogNewProductsComponent,
    PromotionsProductComponent,
    PromotionsListComponent,
    ContactDialogComponent,
    AddtocartDialogNewProductsComponent,
    PromotionDetailsComponent,
    ReviewDialogPromotionsComponent,
    AddToCartDialogPromotionsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    NgxGalleryModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ComponentService,
    NewproductsResolverService,
    UserService,
    AlertifyService,
    AuthService
  ]
})
export class FactorymanagerModule { }
