import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import { DataService } from '../../core/services/data.service';

import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { MessageConstants } from '../../core/common/message.constants';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  @ViewChild('addEditModal') public addEditModal: ModalDirective;
  @ViewChild(TreeComponent)

  private treeProductCategory: TreeComponent;

  public _productCategoryHierachy: any[];
  public _productCategories: any[];
  public entity: any;
  public filter: string = '';
  constructor(private _dataService: DataService,
    private _notificationService: NotificationService,
    private _utilityService: UtilityService) { }

  ngOnInit() {
    this.loadData();
    this.getListForDropdown();
  }

  public createAlias() {
    this.entity.Alias = this._utilityService.MakeSeoTitle(this.entity.Name);
  }

  public getListForDropdown() {
    this._dataService.get('/api/productCategory/getallhierachy')
      .subscribe((response: any[]) => {
        this._productCategories = response;
      }, error => this._dataService.handleError(error));
  }
  //Show add form
  public showAddModal() {
    this.entity = {};
    this.addEditModal.show();
  }

  //Show edit
  public showEdit(id: string) {
    this._dataService.get('/api/productCategory/detail/' + id)
      .subscribe((response: any) => {
        this.entity = response;
        this.addEditModal.show();
      }, error => this._dataService.handleError(error));
  }
  //Load data
  public loadData() {
    this._dataService.get('/api/productCategory/getall?filter=' + this.filter)
      .subscribe((response: any[]) => {
        this._productCategories = response.filter(x => x.ParentId == null);
        this._productCategoryHierachy = this._utilityService.Unflatten2(response);
      }, error => this._dataService.handleError(error));
  }

  //Save change for modal popup
  public saveChanges(valid: boolean) {
    if (valid) {
      if (this.entity.ID == undefined) {
        this._dataService.post('/api/productCategory/add', JSON.stringify(this.entity)).subscribe((response: any) => {
          this.loadData();
          this.addEditModal.hide();
          this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
        }, error => this._dataService.handleError(error));
      }
      else {
        this._dataService.put('/api/productCategory/update', JSON.stringify(this.entity)).subscribe((response: any) => {
          this.loadData();
          this.addEditModal.hide();
          this._notificationService.printSuccessMessage(MessageConstants.UPDATE_OK_MSG);
        }, error => this._dataService.handleError(error));

      }
    }

  }

  //Action delete
  public deleteConfirm(id: string): void {
    this._dataService.delete('/api/productCategory/delete', 'id', id).subscribe((response: any) => {
      this._notificationService.printSuccessMessage(MessageConstants.DELETE_OK_MSG);
      this.loadData();
    }, error => this._dataService.handleError(error));
  }
  //Click button delete turn on confirm
  public delete(id: string) {
    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deleteConfirm(id));
  }

}
