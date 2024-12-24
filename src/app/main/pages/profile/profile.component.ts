import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProfileService } from 'app/main/pages/profile/profile.service';
import { AuthenticationService } from 'app/auth/service';
import { HttpService } from '@core/services/http.service';
import { TrucksItmes } from 'app/main/admin/truks/models/truks';
import { UserDetails } from 'app/main/admin/user/models/users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit, OnDestroy {
  // public
  public contentHeader: object;
  public data: any;
  public toggleMenu = true;
  public Monthly = false;
  public toggleNavbarRef = false;
  public loadMoreRef = false;
  currentUser:any;
  userData:UserDetails;
  truckData:TrucksItmes


  // private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {PricingService} _pricingService
   */
  constructor(private _pricingService: ProfileService, private sanitizer: DomSanitizer,
    private _authenticationService: AuthenticationService,
    private _httpService:HttpService    ) {
    this._unsubscribeAll = new Subject();
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Load More
   */
  loadMore() {
    this.loadMoreRef = !this.loadMoreRef;
    setTimeout(() => {
      this.loadMoreRef = !this.loadMoreRef;
    }, 2000);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._pricingService.onPricingChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.data = response;
    });

    this.getUserData()
    // content header
    this.contentHeader = {
      headerTitle: 'الملف الشخصي',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'الرئيسية',
            isLink: true,
            link: '/'
          },
        
          {
            name: 'الملف الشخصي',
            isLink: false
          }
        ]
      }
    };
  }

  getUserData(){
    this._httpService.get('/Users/GetUserById',{Id:this.currentUser.id},false).subscribe((res: any) => {
      this.userData = res
     

    })
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
