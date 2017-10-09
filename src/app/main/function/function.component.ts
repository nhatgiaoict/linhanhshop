import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import { DataService } from '../../core/services/data.service';

import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { MessageConstants } from '../../core/common/message.constants';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {
  @ViewChild('addEditModal') public addEditModal: ModalDirective;
  @ViewChild('permissionModal') public permissionModal: ModalDirective;
  @ViewChild(TreeComponent)
  private treeFunction: TreeComponent;

  public _functionHierachy: any[];
  public _functions: any[];
  public entity: any;
  public functionId: string;
  public _permission: any[];
  public editFlag: boolean;
  public filter: string = '';
  constructor(private _dataService: DataService,
    private _notificationService: NotificationService,
    private _utilityService: UtilityService) { }

  ngOnInit() {
    this.search();
  }

  //Show add form
  public showAddModal() {
    this.entity = {};
    this.addEditModal.show();
    this.editFlag = false;
  }
  public showPermission(id: any) {
    this._dataService.get('/api/appRole/getAllPermission?functionId=' + id).subscribe((response: any[]) => {
      this.functionId = id;
      this._permission = response;
      this.permissionModal.show();
    }, error => this._dataService.handleError(error));
  }
  //Load data
  public search() {
    this._dataService.get('/api/function/getall?filter=' + this.filter)
      .subscribe((response: any[]) => {
        this._functions = response.filter(x => x.ParentId == null);
        this._functionHierachy = this._utilityService.Unflatten(response);
      }, error => this._dataService.handleError(error));
  }

  //Save change for modal popup
  public saveChanges(valid: boolean) {
    if (valid) {
      if (this.editFlag == false) {
        this._dataService.post('/api/function/add', JSON.stringify(this.entity)).subscribe((response: any) => {
          this.search();
          this.addEditModal.hide();
          this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
        }, error => this._dataService.handleError(error));
      }
      else {
        this._dataService.put('/api/function/update', JSON.stringify(this.entity)).subscribe((response: any) => {
          this.search();
          this.addEditModal.hide();
          this._notificationService.printSuccessMessage(MessageConstants.UPDATE_OK_MSG);
        }, error => this._dataService.handleError(error));

      }
    }

  }

  //Save permission

  public savePermission(valid:boolean, _permission:any[]){
    if(valid){
      var data={
        Permissions:this._permission,
        FunctionId:this.functionId
      };
      this._dataService.post('/api/appRole/savePermission', JSON.stringify(data))
      .subscribe((response:any)=>{
        this._notificationService.printSuccessMessage(response);
        this.permissionModal.hide();
      }, error=>this._dataService.handleError(error));
    }
  }
  //Show edit form
  public showEdit(id: string) {
    this._dataService.get('/api/function/detail/' + id).subscribe((response: any) => {
      this.entity = response;
      this.editFlag = true;
      this.addEditModal.show();
    }, error => this._dataService.handleError(error));
  }

  //Action delete
  public deleteConfirm(id: string): void {
    this._dataService.delete('/api/function/delete', 'id', id).subscribe((response: any) => {
      this._notificationService.printSuccessMessage(MessageConstants.DELETE_OK_MSG);
      this.search();
    }, error => this._dataService.handleError(error));
  }
  //Click button delete turn on confirm
  public delete(id: string) {
    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deleteConfirm(id));
  }
}