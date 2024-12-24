import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {Location} from '@angular/common';


@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss'],
})
export class BreadCrumbComponent implements OnInit, OnDestroy {
  @Input() links: IBreadCrumbInterface[] = [];

  routingSupscription: Subscription | undefined;
  setBreadCrumbValue: boolean =false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    let routingData:any =this.route.snapshot.firstChild?.data
    this.links = [
      {
        name: this.route.snapshot.data['breadcrumb'],
        route: this.route.snapshot.data['url'],
        level :this.route.snapshot.data['level']
      }
    ];

this.setBreadCrumbAfterLoadingPage(routingData)
    this.changeRouting();
  }

  setBreadCrumbAfterLoadingPage(routingData:any){
    console.log("🚀 ~ setBreadCrumbAfterLoadingPage ~ routingData", routingData)
    //check if routing data and level not 1 (not main routing)
    if(routingData && routingData.level > 1){
      this.links.push({
        name: routingData.breadcrumb,
        route: routingData.url,
        level:routingData.level
      });
      }
  }
  changeRouting() {
    let routingData: any;
    this.routingSupscription = this.router.events.subscribe((event: any) => {

      if (event instanceof NavigationEnd) {
        routingData = this.route.snapshot.firstChild?.data;
        const isFound = this.links.some((res: any) => {
          if (routingData.url == res.route) {
            return true;
          } else return false;
        })







        this.setBreadCrumb(isFound,routingData)

      }

    })
  }

  setBreadCrumb(routingNameisFound:boolean,routingData:any,conditionLevel:number=1){
  console.log("🚀 ~ setBreadCrumb ~ routingData", routingData)
  console.log("🚀 ~ setBreadCrumb ~ routingNameisFound", routingNameisFound)

    if (!routingNameisFound) {
      if (this.links.length > conditionLevel) {
        this.links.pop();
        this.links.push({
          name: routingData.breadcrumb,
          route: routingData.url,
          level:routingData.level

        });
      } else
        this.links.push({
          name: routingData.breadcrumb,
          route: routingData.url,
          level:routingData.level
        });
    }

this.activeRoute(routingData)
  }

  activeRoute(data:any){
this.clicked(data.level)
//     this.links.map((res:any)=>{
// console.log(res);

//         console.log(res.route.match(url)),res.level;
//         //  this.clicked(res.level)

//     })
  }

  clicked(item:number){
  if(item)
  this.links.length =item
  }

  ngOnDestroy(): void {
    this.routingSupscription?.unsubscribe();
  }
}

export interface IBreadCrumbInterface {
  name?: any;
  route?: string;
  level:number
}
