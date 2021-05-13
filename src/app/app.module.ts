import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { FactorymanagerModule } from './factorymanager/factorymanager.module';

import { Routes, RouterModule } from '@angular/router';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { HttpClientModule } from '@angular/common/http';
import { TreeComponent } from './factorymanager/components/tree/tree.component';
import { PageNotFoundComponent } from './factorymanager/components/page-not-found/page-not-found.component';
import { ToolbarComponent } from './factorymanager/components/toolbar/toolbar.component';

const routes: Routes = [
  // { path: 'factorymanager', loadChildren: () => import('./factorymanager/factorymanager.module')
  //                                               .then(m => m.FactorymanagerModule) },
  { path: '', component: TreeComponent },
  { path: '**', component: PageNotFoundComponent },

]

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FactorymanagerModule,
    RouterModule.forRoot(routes),
    ButtonsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
