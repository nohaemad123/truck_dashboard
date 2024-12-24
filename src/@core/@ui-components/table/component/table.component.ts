import { log } from 'console';
import { ActionsList, IColoumnType, IActions, StatusList } from './../interface/table.interface';
import { Router } from '@angular/router';
// import { SharedService } from './../../../../shared/services/shared.service';
// import { environment } from 'src/environments/environment';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatDialog } from '@angular/material/dialog';
// import * as moment from 'moment';
// import { ITable } from 'src/app/modules/incident/pages/my-incident/my-incident.component';
import Swal from 'sweetalert2';
import { Observable, Observer } from 'rxjs';
import { SelectionType } from '@swimlane/ngx-datatable';
import { SettingsService } from '@core/services/settings.service';
import { UntypedFormControl, Validators } from '@angular/forms';
import { environment } from 'environments/environment';

export interface ExampleTab {
  label: string;
  content?: string;
}
export interface Data {

  id: number;
  img?: string;
  actions?: {
    delete?: boolean;
    edit?: boolean;
  };
}




@Component({
  selector: 'app-custom-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation:ViewEncapsulation.None
})

export class CustomTableComponent implements OnInit {
  indexArr = 0;
  largScreens: boolean = true
imageBaseUrl=environment.urlApiFile;
  @Output() AddRecord: EventEmitter<any> = new EventEmitter();

  @Output() DeleteRowEvent: EventEmitter<any> = new EventEmitter();
  @Output() EditRowEvent: EventEmitter<any> = new EventEmitter();
  @Output() ViewRowEvent: EventEmitter<any> = new EventEmitter();
  @Output() ArchiveRowEvent: EventEmitter<any> = new EventEmitter();
  @Output() DownloadRowEvent: EventEmitter<any> = new EventEmitter();
  @Output() DuplicateRowEvent: EventEmitter<any> = new EventEmitter();
  @Output() SendEvent: EventEmitter<any> = new EventEmitter();
  @Output() SendSms: EventEmitter<any> = new EventEmitter();
  @Output() SelectedRowsEvent: EventEmitter<any[]> = new EventEmitter();
  @Output() BellEvent: EventEmitter<any> = new EventEmitter();

  
  @Output()changCheckBoxRowEvent: EventEmitter<{value:any,row:any}> = new EventEmitter();
  
  @Input('coloumns') coloumns: IColoumnType[];
  @Input('searchValue') searchValue: string;
  @Input('searchFilterKey') searchFilterKey: string[];
  @Input('small_columns') small_columns: IColoumnType[];

  

  @Input('rows') rows: any[];
  @Input('SelectedRows') SelectedRows: any = [];
  @Input('Tabs') Tabs: any[] = [];
  @Input('AddNewBtn') AddNewBtn: { Url?: string, Model?: string };
  @ViewChild('tableRowDetails') tableRowDetails: any;

  public collapsedColumns = [];

  public SelectionType = SelectionType;

  displayedColumns: string[] = [];
  displayedSmallColumns: string[] = [];

  asyncTabs: Observable<any[]>;
  // dataSource: any;
  actionsList = ActionsList;
  StatusList=StatusList

  // environment = environment;

  // ActivewRow: boolean = false;
  windowWidth: number = 0;
  getIsMobileView: boolean;
  constructor(private router: Router,private _settingsService:SettingsService) {
    // this.type=["image","text"]
    // this.asyncTabs = new Observable((observer: Observer<any[]>) => {
    //   setTimeout(() => {
    //     observer.next(this.Tabs);
    //   }, 1000);
    // });

  }
  getOptionIcon(name: string) {
    return this.actionsList.find(o => o.name == name)?.icon
  }

  
  filterUpdate(event){
      console.log('event',event.target.value);
      
  }

  changCheckBox(event,row:any){
     console.log('event.checked',event);
     
    this.changCheckBoxRowEvent.emit({value:event,row:row});
  }
  getStatus(id: number) {
    return this.StatusList.find(o => o.id == id)
  }
  getCollapsedActions(col: IActions) {
    return col.data.filter(o => o.collapsed == true);
  }

  getNotCollapsedActions(col: IActions) {
    return col.data.filter(o => o.collapsed != true);
  }
  clickable() {
    try {
      let actions = this.coloumns.find(o => o.type == 'actions')?.data as any[]
      let action = actions.find(o => o.name == 'view' || o.name == 'edit');
      if (action)
        return true
      else
        return false;
    } catch (error) {
      return false;

    }

  }

  getViewClick(row: any) {
    try {
      let actions = this.coloumns.find(o => o.type == 'actions')?.data as any[]
      let action = actions.find(o => o.name == 'view' || o.name == 'edit');
      if (action)
        this.actionClicked(action, row[action.id])
    } catch (error) {
      return null;

    }


  }
  AddRecordCLick() {
    if (this.AddNewBtn) {

      this.AddRecord.emit(this.AddNewBtn);
      if (this.AddNewBtn.Url)
        this.router.navigate([this.AddNewBtn.Url]);
    }
  }

  /**
   * For ref only, log selected values
   *
   * @param selected
   */
  onSelect({ selected }) {
this.SelectedRowsEvent.emit(selected);
    console.log('Select Event', selected);
  }

  // renderTable(width: number) {

  //   if (width > 855) {
  //     //large screen
  //     this.largScreens = true
  //     this.coloumns.map((col: any) => {
  //       console.log("🚀 ~ this.columns.map ~ col", col)
  //       this.displayedColumns.push(col.name)

  //     })

  //   } else {
  //     // small screen
  //     this.largScreens = false
  //     this.small_columns.map((col: any) => {
  //       console.log("🚀 ~ this.small_columns.map ~ col", col)
  //       this.displayedColumns.push(col.name)

  //     })

  //   }
  // }
  // @HostListener('window:resize', ['$event'])
  // onWindowResize() {
  //   this.windowWidth = window.innerWidth
  //   //  console.log("🚀 ~ onWindowResize ~ windowWidth", this.windowWidth)
  //   this.displayedColumns = []
  //   this.renderTable(this.windowWidth)

  // }
  // rowDetailsToggleExpand(row) {
  //   this.tableRowDetails.rowDetail.toggleExpandRow(row);
  // }

  ngOnInit() {
    // this._settingsService.getIsMobileView().subscribe(o=>{
    //   this.getIsMobileView=o
    // })
    this.renderTable(window.innerWidth);
    // this.renderTable(window.innerWidth)
    // // this.dataSource = new MatTableDataSource<any>(this.rows);
    // this.selection = new SelectionModel<any>(true, []);
  }



  renderTable(width: number) {
    // console.log('asdddddddddddddddddddddd',width);
 if(width > 800){
      this.largScreens = true;
      this.displayedColumns =[]
      this.coloumns?.map((col:any) => {
        console.log("🚀 ~ this.columns.map ~ col", col)
         this.displayedColumns.push(col)
      })



    }

    else  {
      // small screen
      this.largScreens = false;
      this.displayedSmallColumns=[];
      // console.log("🚀 ~ this.small_columns.map ~ col");
      this.small_columns?.map((col: any) => {
        console.log("🚀 ~ this.small_columns.map ~ col", col)
        this.displayedSmallColumns.push(col);
      });
    }
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.windowWidth = window.innerWidth;
    //  console.log("🚀 ~ onWindowResize ~ windowWidth", this.windowWidth)
    this.displayedColumns = [];
    this.displayedSmallColumns=[];
    this.renderTable(this.windowWidth);
  }



  // changeIndex(i: any) {
  //   this.changeIndex = i;
  // }
  // /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;

  //   console.log('numRows', numRows);
  //   console.log('numSelected', numSelected);

  //   return numSelected === numRows;
  // }

  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  // toggleAllRows() {
  //   if (this.isAllSelected()) {
  //     this.selection.clear();
  //     return;
  //   }

  //   this.selection.select(...this.dataSource.data);
  // }

  // /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: Data) {
  //   if (!row) {

  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }

  //   return row.id;
  //   this.ActivewRow = true;
  // }
  actionClicked(data: any, id: any,row?:any) {
    let modal = data.modal;
    // debugger;
    switch (data.name) {
      case 'view':
        this.ViewRowEvent.emit({ id, modal ,row});
        break;
        case 'bell':
          this.BellEvent.emit({ id, modal ,row});
          break; 
        
      case 'edit':
        this.EditRowEvent.emit({ id, modal ,row});
        break;
      case 'delete':
        this.DeleteRowEvent.emit({ id, modal,row });
        break;
      case 'archive':
        this.ArchiveRowEvent.emit({ id, modal,row });
        break;
      case 'download':
        this.DownloadRowEvent.emit({ id, modal ,row});
        break;
      case 'duplicate':
        this.DuplicateRowEvent.emit({ id, modal,row });
        break;
        case 'send':
          this.SendEvent.emit({ id, modal,row });
          break;
          case 'mail':
            this.SendSms.emit({ id, modal,row });
            break;



        
    }

    if (data.url)
      this.router.navigate([data.url, id]);

  }
  changeSource(event:any) {
    let fallback_path = 'assets/images/image.svg';
    event.target.src = fallback_path;

  }
}
