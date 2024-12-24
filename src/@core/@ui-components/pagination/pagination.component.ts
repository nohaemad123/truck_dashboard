import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPagination } from './interface/pagination.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() paginationOption: IPagination
  @Output() currentPagination = new EventEmitter<any>()

  constructor() {
    this.paginationOption = {
      page: 1,
      totalPages: 10,
      pageTable: 0,
      pageArray:0
    }
  }


  ngOnInit(): void {
  
  }

  setPage(page: any) {
    console.log("set page:", page);
    console.log("total pages:", this.paginationOption.totalPages);
    console.log("pagination page: ",this.paginationOption.page)
    this.currentPagination.emit(page);
  }

}
