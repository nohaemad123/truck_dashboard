import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminService } from './admin.service';
const internalRouting: Routes = [
  { path: '', redirectTo:'dashboard',pathMatch:'full' },

  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
    
  },

  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },

  {
    path: 'Pages',
    loadChildren: () => import('./static-pages/static-pages.module').then(m => m.StaticPagesModule),
  },
  {
    path: 'banners',
    loadChildren: () => import('./bannars/bannars.module').then(m => m.BannarsModule),
  },

  {
    path: 'banks',
    loadChildren: () => import('./banks/banks.module').then(m => m.BanksModule),
  },

  {
    path: 'cities',
    loadChildren: () => import('./cities/cities.module').then(m => m.CitiesModule),
  },
  {
    path: 'services',
    loadChildren: () => import('./services/services.module').then(m => m.ServicesModule),
  },
  {
    path: 'how-join',
    loadChildren: () => import('./how-join/how-join.module').then(m => m.HowJoinModule),
  },
  {
    path: 'privacypolicies',
    loadChildren: () => import('./privacypolicies/privacypolicies.module').then(m => m.PrivacyPoliciesModule),
  },


  {
    path: 'Trucks',
    loadChildren: () => import('./truks/truks.module').then(m => m.TruksModule),
  },



  {
    path: 'Notifations',
    loadChildren: () => import('./notifcations/notifcations.module').then(m => m.NotifcationsModule),
  },


  {
    path: 'Sms',
    loadChildren: () => import('./sms/sms.module').then(m => m.SmsModule),
  },

  
  {
    path: 'Frequent-questions',
    loadChildren: () => import('./frequent-questions/frequent-questions.module').then(m => m.FrequentQuestionsModule),
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule),
  },
  {
    path: 'truck-notifications',
    loadChildren: () => import('./truck-notifications/truck-notifications.module').then(m => m.TruckNotificationsModule),
  },
 
  {
    path: 'RequestsTrucks',
    loadChildren: () => import('./requests-trucks/requests-trucks.module').then(m => m.RequestsTrucksModule),
  },

//   {
//    path: 'RequestsTrucks',
//    component: RequestsTrucksComponent,
//    // canActivate: [AuthGuard]
//  }
// ,
  {
    path: 'businessTypes',
    loadChildren: () => import('./bussines-types/bussines-types.module').then(m => m.BussinesTypesModule),
  },


  {
    path: 'Subscriptioncosts',
    loadChildren: () => import('./subscription-costs/subscription-costs.module').then(m => m.SubscriptionCostsModule),
  },
  {
    path: 'features',
    loadChildren: () => import('./set-apart/set-apart.module').then(m => m.SetApartModule),
  },
  {
    path: 'Packages',
    loadChildren: () => import('./packages/packages.module').then(m => m.PackagesModule),
  },

  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule),
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./coontact-us/coontact-us.module').then(m => m.CoontactUsModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
];


export const internalRoutes = RouterModule.forChild(internalRouting);
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    internalRoutes
  ]
})
export class AdminModule { }
