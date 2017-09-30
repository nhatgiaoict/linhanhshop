import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/services/notification.service';
import { MessageConstants } from '../../core/common/message.constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  
    public pageIndex: number = 1;
    public pageSize: number = 20;
    public pageDisplay: number = 10;
    public totalRow: number;
    public filter: string = '';
    public users: any[];
    public entity: any;
    constructor(private _dataService: DataService, private _notificationService: NotificationService) { }
  
    ngOnInit() {
      this.loadData();
    }
  
    loadData() {
      this._dataService.get('api/appUser/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
        .subscribe((response: any) => {
          this.users = response.Items;
          this.pageIndex = response.PageIndex;
          this.pageSize = response.PageSize;
          this.totalRow = response.TotalRows;
        });
    }
  
    loadRole(id: any) {
      this._dataService.get('api/appUser/detail/' + id)
        .subscribe((response: any) => {
          this.entity = response;
        });
    }
  
    pageChanged(event: any): void {
      this.pageIndex = event.page;
      this.loadData();
    }
  
    showAddModal() {
      this.entity = {};
      this.modalAddEdit.show();
    }
  
    showEditModal(id: any) {
      this.loadRole(id);
      this.modalAddEdit.show();
    }
  
    saveChange(valid: boolean) {
      if (valid) {
        if (this.entity.Id == undefined) {
          this._dataService.post('/api/appUser/add', JSON.stringify(this.entity))
            .subscribe((respose: any) => {
              this.loadData();
              this.modalAddEdit.hide();
              this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
            }, error => this._dataService.handleError(error));
        }
        else {
          this._dataService.put('/api/appUser/update', JSON.stringify(this.entity))
            .subscribe((respose: any) => {
              this.loadData();
              this.modalAddEdit.hide();
              this._notificationService.printSuccessMessage(MessageConstants.UPDATE_OK_MSG);
            }, error => this._dataService.handleError(error));
        }
      }
    }
  
    deleteItems(id: any) {
      this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id));
    }
  
    deleteItemConfirm(id: any) {
      this._dataService.delete('/api/appUser/delete', 'id', id)
        .subscribe((response: Response) => {
          this._notificationService.printSuccessMessage(MessageConstants.DELETE_OK_MSG);
          this.loadData();
        });
    }

}
