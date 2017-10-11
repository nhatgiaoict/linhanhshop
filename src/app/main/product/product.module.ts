import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import {ProductRouter} from './product.routes';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UploadService } from '../../core/services/upload.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {SimpleTinyComponent} from '../../shared/simple-tiny/simple-tiny.component';

@NgModule({
  imports: [
    CommonModule,
    ProductRouter,
    FormsModule,
    ModalModule,
    PaginationModule
    
  ],
  declarations: [ProductComponent,SimpleTinyComponent],
  providers:[DataService,NotificationService,UploadService]
})
export class ProductModule { }
