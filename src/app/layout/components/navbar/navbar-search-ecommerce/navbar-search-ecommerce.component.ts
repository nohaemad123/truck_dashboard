import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';

import { SettingsService } from '@core/services/settings.service';
import { SearchEcommerceService } from './navbar-search-ecommerce.service';
import { SearchQueryInterface } from 'app/main/ecommerce/ecommerce-shop/sidebar/sidebar.component';

@Component({
  selector: 'app-navbar-search-ecommerce',
  templateUrl: './navbar-search-ecommerce.component.html'
})

export class NavbarSearchEcommerceComponent implements OnInit {
  // Public
  public searchText = '';
  public searchTex = '';
  public openSearchRef = false;
  public activeIndex = 0;
  public apiData;
  public pages = [];
  public files = [];
  public contacts = [];
  public pageSearchLimit;
query:SearchQueryInterface;
  // Decorators
  @ViewChild('openSearch') private _inputElement: ElementRef;
  @ViewChild('pageList') private _pageListElement: ElementRef;
  getIsMobileView: boolean;

  @HostListener('keydown.escape') fn() {
    this.removeOverlay();
    this.openSearchRef = false;
    this.searchText = '';
  }
  @HostListener('document:click', ['$event']) clickout(event) {
    if (event.target.className === 'content-overlay') {
      this.removeOverlay();
      this.openSearchRef = false;
      this.searchText = '';
    }
  }
  searchTerm(term: string) {
    this.query={}
    this.query.name=term
    this.router.navigate(['shop' ], { queryParams: this.query });
    // this._searchEcommerceService.searchTerm(term)
  }

  /**
   *
   * @param document
   * @param router
   * @param _searchService
   */
  constructor(
    @Inject(DOCUMENT) private document,
    private _elementRef: ElementRef,
    private router: Router,
    private _settingsService: SettingsService,

    public _searchEcommerceService: SearchEcommerceService
  ) { }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Next Active Match
   */
  nextActiveMatch() {
    this.activeIndex = this.activeIndex < this.pageSearchLimit - 1 ? ++this.activeIndex : this.activeIndex;
  }

  /**
   * Previous Active Match
   */
  prevActiveMatch() {
    this.activeIndex = this.activeIndex > 0 ? --this.activeIndex : 0;
  }

  /**
   * Remove Overlay
   */
  removeOverlay() {
    this.document.querySelector('.app-content').classList.remove('show-overlay');
  }

  /**
   * Auto Suggestion
   *
   * @param event
   */
  autoSuggestion(event) {
    if (38 === event.keyCode) {
      return this.prevActiveMatch();
    }
    if (40 === event.keyCode) {
      return this.nextActiveMatch();
    }
    if (13 === event.keyCode) {
      // Navigate to activeIndex
      // ! Todo: Improve this code
      let current_item = this._pageListElement.nativeElement.getElementsByClassName('current_item');
      current_item[0]?.children[0].click();
    }
  }

  /**
   * Toggle Search
   */
  toggleSearch() {
    this._searchEcommerceService.onIsBookmarkOpenChange.next(false);
    this.removeOverlay();
    this.openSearchRef = !this.openSearchRef;
    this.activeIndex = 0;
    setTimeout(() => {
      this._inputElement.nativeElement.focus();
    });

    if (this.openSearchRef === false) {
      this.document.querySelector('.app-content').classList.remove('show-overlay');
      this.searchText = '';
    }
  }

  /**
   * Search Update
   *
   * @param event
   */
  searchUpdate(event) {
    const val = event.target.value.toLowerCase();
    // if (val !== '') {
    //   this.document.querySelector('.app-content').classList.add('show-overlay');
    // } else {
    //   this.document.querySelector('.app-content').classList.remove('show-overlay');
    // }
    // this.searchTerm(val)
    // this.autoSuggestion(event);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._searchEcommerceService.searchText.subscribe(o=>{
      this.searchTex=o
    })
    this._settingsService.getIsMobileView().subscribe(o => {
      this.getIsMobileView = o
    })
    this._searchEcommerceService.onApiDataChange.subscribe(res => {
      this.apiData = res;
      this.pages = this.apiData[0].data;
      this.pageSearchLimit = this.apiData[0].searchLimit;
      this.files = this.apiData[1].data;
      this.contacts = this.apiData[2].data;
    });
  }
}
