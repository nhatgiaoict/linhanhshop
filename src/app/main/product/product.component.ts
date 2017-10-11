import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { AuthenService } from '../../core/services/authen.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/services/notification.service';
import { UploadService } from '../../core/services/upload.service';
import { MessageConstants } from '../../core/common/message.constants';
import { SystemConstants } from '../../core/common/system.constants';
import { UtilityService } from '../../core/services/utility.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  @ViewChild('thumbnailImage') thumbnailImage;

  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filterKeyword: string = '';
  public filterCategoryID: number;
  public users: any[];
  public entity: any;
  public products: any[];
  public baseFolder: string = SystemConstants.BASE_API;
  public productCategories: any[];
  public checkedItems:any[];

  constructor(private _dataService: DataService,
    private _notificationService: NotificationService,
    private _uploadService: UploadService,
    public _authenService: AuthenService,
    private _utilityService: UtilityService) { }

  ngOnInit() {
    this.search();
    this.loadProductCategories();
  }

  public createAlias() {
    this.entity.Alias = this._utilityService.MakeSeoTitle(this.entity.Name);
  }
  public search() {
    this._dataService.get('/api/product/getall?categoryId=' + this.filterCategoryID + '&keyword=' + this.filterKeyword + '&page=' + this.pageIndex + '&pageSize=' + this.pageSize)
      .subscribe((response: any) => {
        this.products = response.Items;
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
        console.log(this.products.length);
      });
  }

  public reset(){
    this.filterKeyword="";
    this.filterCategoryID=null;
    this.search();
  }


  loadProductCategories() {
    this._dataService.get('/api/productCategory/getallhierachy').subscribe((response: any[]) => {
      this.productCategories = response;
    }, error => this._dataService.handleError(error));
  }
  loadProductDetail(id: any) {
    this._dataService.get('/api/product/detail/' + id)
      .subscribe((response: any) => {
        this.entity = response;
      }, error=>this._dataService.handleError(error));
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.search();
  }

  public keyupHandlerContentFunction(e: any) {
    this.entity.Content = e;
  }


  showAddModal() {
    this.entity = {Content:''};
    this.modalAddEdit.show();
  }

  showEditModal(id: any) {
    this.loadProductDetail(id);
    this.modalAddEdit.show();
  }

  saveChange(valid: boolean) {
    if (valid) {
      let fi = this.thumbnailImage.nativeElement;
      if (fi.files.length > 0) {
        this._uploadService.postWithFile('/api/upload/saveImage?type=product', null, fi.files)
          .then((imageUrl: string) => {
            this.entity.ThumbnailImage = imageUrl;
          }).then(() => {
            this.saveData();
          });
      }
      else {
        this.saveData();
      }
    }
  }

  saveData() {
    if (this.entity.ID == undefined) {
      this._dataService.post('/api/product/add', JSON.stringify(this.entity))
        .subscribe((respose: any) => {
          this.search();
          this.modalAddEdit.hide();
          this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
        }, error => this._dataService.handleError(error));
    }
    else {
      this._dataService.put('/api/product/update', JSON.stringify(this.entity))
        .subscribe((respose: any) => {
          this.search();
          this.modalAddEdit.hide();
          this._notificationService.printSuccessMessage(MessageConstants.UPDATE_OK_MSG);
        }, error => this._dataService.handleError(error));
    }
  }

  deleteItems(id: any) {
    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id));
  }

  deleteItemConfirm(id: any) {
    this._dataService.delete('/api/product/delete', 'id', id)
      .subscribe((response: Response) => {
        this._notificationService.printSuccessMessage(MessageConstants.DELETE_OK_MSG);
        this.search();
      });
  }

  public deleteMulti(){
    this.checkedItems = this.products.filter(x=>x.Checked);
    var checkedIds=[];
    for(var i=0;i<this.checkedItems.length;i++)
    checkedIds.push(this.checkedItems[i]["ID"]);
    
    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG,()=>{
      this._dataService.delete('/api/product/deletemulti', 'checkedProducts', JSON.stringify(checkedIds))
      .subscribe((response:any)=>{
        this._notificationService.printSuccessMessage(MessageConstants.DELETE_OK_MSG);
        this.search();
      }, error=>this._dataService.handleError(error));
    });
  }

}
