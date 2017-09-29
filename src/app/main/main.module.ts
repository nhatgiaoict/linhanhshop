import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { mainRoutes } from './main.routes';
import { Router, RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import { HomeModule } from './home/home.module';
import { RoleModule } from './role/role.module';
import { UtilityService } from '../core/services/utility.service';
import { AuthenService } from '../core/services/authen.service';
import { ProductCategoryComponent } from './product-category/product-category.component';

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    HomeModule,
    RoleModule,
    RouterModule.forChild(mainRoutes)
  ],
  providers: [UtilityService, AuthenService],
  declarations: [MainComponent, ProductCategoryComponent]
})
export class MainModule { }
