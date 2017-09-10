import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {mainRoutes} from './main.routes';
import {Router, RouterModule} from '@angular/router';
import {UserModule} from './user/user.module';
import { ProductCategoryComponent } from './product-category/product-category.component';

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    RouterModule.forChild(mainRoutes)
  ],
  declarations: [MainComponent, ProductCategoryComponent]
})
export class MainModule { }
