import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { Routes, RouterModule } from '@angular/router';
import {DataService} from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';

const roleRoute: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: RoleComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(roleRoute)
  ],
  declarations: [RoleComponent],
  providers:[DataService,NotificationService]
})
export class RoleModule { }
