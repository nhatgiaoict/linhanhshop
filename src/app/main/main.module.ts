import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { mainRoutes } from './main.routes';
import { Router, RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import { HomeModule } from './home/home.module';
import { RoleModule } from './role/role.module';
import { ProductCategoryModule} from './product-category/product-category.module';
import {ProductModule} from './product/product.module';
import { FunctionModule } from './function/function.module';
import { UtilityService } from '../core/services/utility.service';
import { AuthenService } from '../core/services/authen.service';
import {SidebarMenuComponent} from '../shared/sidebar-menu/sidebar-menu.component';
import {TopMenuComponent} from '../shared/top-menu/top-menu.component';

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    HomeModule,
    RoleModule,
    FunctionModule,
    ProductCategoryModule,
    ProductModule,
    RouterModule.forChild(mainRoutes)
  ],
  providers: [UtilityService, AuthenService],
  declarations: [MainComponent,SidebarMenuComponent,TopMenuComponent]
})
export class MainModule { }
