import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category.component';
import { Routes, RouterModule } from '@angular/router';
import { TreeModule } from 'angular-tree-component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

const productCategoryRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: ProductCategoryComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productCategoryRoutes),
    TreeModule,
    FormsModule,
    ModalModule
  ],
  declarations: [ProductCategoryComponent]
})
export class ProductCategoryModule { }
