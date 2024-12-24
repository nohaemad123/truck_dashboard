import { CoreMenu } from '@core/types';

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [
  // Dashboard
  {
    id: 'dashboard',
    title: 'لوحة المتابعة',
    translate: 'MENU.DASHBOARD.COLLAPSIBLE',
    type: 'collapsible',
    icon: 'home',
    children: [
      {
        id: 'analytics',
        title: 'الاحصائيات',
        translate: 'MENU.DASHBOARD.ANALYTICS',
        type: 'item',
        role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
        url: 'admin/dashboard/statistics',
        icon: 'circle',
        // url: 'admin/dashboard/analytics'
      },
      {
        id: 'settings',
        title: 'الإعدادات',
        translate: 'الإعدادات',
        type: 'item',
        role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
        url: 'admin/settings',
        icon: 'circle',
        // url: 'admin/dashboard/analytics'
      },


    ]
  },



  // {
  //   id: 'Truck',
  //   title: 'العربات المتنقله',
  //   translate: 'MENU.APPS.Trucks',
  //   type: 'item',
  //   icon: 'truck',
  //   children: [
     

  //     {
  //       id: 'allTrucks',
  //       title: 'كافه العربات',
  //       translate: 'MENU.DASHBOARD.ANALYTICS',
  //       type: 'item',
  //       role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
  //       url: '/admin/Trucks',
  //       icon: 'truck',
  //       // url: 'admin/dashboard/analytics'
  //     },


  //     {
  //       id: 'truksRequest',
  //       title: 'طلبات الحجز',
  //       translate: 'MENU.DASHBOARD.ANALYTICS',
  //       type: 'item',
  //       role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
  //       url: 'admin/dashboard/statistics',
  //       icon: 'circle',
  //       // url: 'admin/dashboard/analytics'
  //     },
  //   ]
  // },

  // Apps & Pages
  {
    id: 'catalog',
    type: 'section',
    title: 'اقسام الموقع',
    translate: 'اقسام الموقع',
    icon: 'package',
    children: [

      {
        id: 'truks',
        title: 'العربات المتنقله',
        translate: 'العربات المتنقله',
        type: 'collapsible',
        icon: 'truck',
        children: [
          {
            id: 'allTrucks',
            title: 'كافه العربات',
            translate: 'كافه العربات',
            type: 'item',
            role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
            url: '/admin/Trucks',
            icon: 'circle',
            // url: 'admin/dashboard/analytics'
          },
          {
            id: 'allTrucksReuest',
            title: 'العربات الغير مقبوله',
            translate: 'العربات الغير مقبوله',
            type: 'item',
            role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
            url: '/admin/RequestsTrucks',
            icon: 'circle',
            // url: 'admin/dashboard/analytics'
          },
        ]
      },


        {
        id: 'businessTypes',
        title: 'أنواع الانشطه',
        translate: 'MENU.APPS.businessTypes',
        type: 'item',
        icon: 'database',
        url: '/admin/businessTypes'
      },
     
      {
        id: 'cities',
        title: 'المدن',
        translate: 'MENU.APPS.Cities',
        type: 'item',
        icon: 'map-pin',
        url: '/admin/cities'
      },

      // {
      //   id: 'subscription_costs',
      //   title: 'الاشتراكات',
      //   translate: 'الاشتراكات',
      //   type: 'item',
      //   icon: 'file',
      //   url: '/admin/Subscriptioncosts'
      // },  
   
      
      // {
      //   id: 'Notifations',
      //   title: 'kالاشعارات',
      //   translate: 'kالاشعارات',
      //   type: 'item',
      //   icon: 'bell',
      //   url: '/admin/Notifations'
      // }
      // ,
      {
        id: 'notification',
            title: 'الاشعارات',
        translate: 'الاشعارات',
        type: 'collapsible',
        icon: 'bell',
        children: [
          {
            id: 'allTrucksReuest',
            title: 'اشعارات التراكات',
            translate: 'اشعارات التراكات',
            type: 'item',
            role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
            url: '/admin/truck-notifications',
            icon: 'circle',
            // url: 'admin/dashboard/analytics'
          },
          {
            id: 'allTrucks',
            title: 'اشعارات المستخدمين',
            translate: 'اشعارات المستخدمين',
            type: 'item',
            role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
            url: '/admin/notifications',
            icon: 'circle',
            // url: 'admin/dashboard/analytics'
          },
          
        ]
      },
      // {
      //   id: 'notification',
      //       title: 'الرسائل',
      //   translate: 'الرسائل',
      //   type: 'collapsible',
      //   icon: 'mail',
      //   children: [
      //     {
      //       id: 'allTrucksReuest',
      //       title: 'كافة الرسائل',
      //       translate: 'كافة الرسائل',
      //       type: 'item',
      //       role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
      //       url: '/admin/RequestsTrucks',
      //       icon: 'circle',
      //       // url: 'admin/dashboard/analytics'
      //     },
      //     {
      //       id: 'allTrucks',
      //       title: 'ارسال رسالة',
      //       translate: 'ارسال رسالة',
      //       type: 'item',
      //       role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
      //       url: '/admin/Sms',
      //       icon: 'circle',
      //       // url: 'admin/dashboard/analytics'
      //     },
          
      //   ]
      // },
      {
        id: 'banks',
        title: 'الرسائل',
        translate: 'الرسائل',
        type: 'item',
        icon: 'mail',
        url: '/admin/Sms'
      },
      // {
      //   id: 'Sms',
      //   title: 'الرسائل',
      //   translate: 'الرسائل',
      //   type: 'item',
      //   icon: 'mail',
      //   url: '/admin/Sms'
      // },
      {
        id: 'banks',
        title: 'البنوك',
        translate: 'MENU.APPS.Banks',
        type: 'item',
        icon: 'credit-card',
        url: '/admin/banks'
      },
   
      {
        id: 'frequent-questions',
        title: 'الاسئلة',
        translate: 'الاسئلة',
        type: 'item',
        icon: 'help-circle',
        url: '/admin/Frequent-questions'
      },
      {
        id: 'banners',
        title: 'البنرز',
        translate: 'البنرز',
        type: 'item',
        icon: 'image',
        url: '/admin/banners'
      },
      // {
      //   id: 'packages',
      //   title: 'الباقات',
      //   translate: 'الباقات',
      //   type: 'item',
      //   icon: 'package',
      //   url: '/admin/Packages'
      // },

      {
        id: 'pages',
        title: 'الصفحات',
        translate: 'الصفحات',
        type: 'collapsible',
        icon: 'archive',
        children: [
          {
            id: 'setAPart',
            title: 'المميزات',
            translate: 'المميزات',
            type: 'item',
            icon: 'star',
            url: '/admin/features'
          },
          {
            id: 'services',
            title: 'الخدمات',
            translate: 'الخدمات',
            type: 'item',
            icon: 'layers',
            url: '/admin/services'
          },
          {
            id: 'PrivacyPolicies',
            title: 'سياسه الخصوصيه',
            translate: 'سياسه الخصوصيه',
            type: 'item',
            icon: 'file-text',
            url: '/admin/privacypolicies'
          },

          
        ]
      } ,
      {
        id: 'notification',
            title: 'كيف تنضم الينا؟',
        translate: 'كيف تنضم الينا؟',
        type: 'collapsible',
        icon: 'user-plus',
        children: [
          {
            id: 'allTrucksReuest',
            title: 'كعميل',
            translate: 'كعميل',
            type: 'item',
            role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
            url: '/admin/how-join/Edit/1',
            icon: 'circle',
            // url: 'admin/dashboard/analytics'
          },
          {
            id: 'allTrucks',
            title: 'كصاحب العربة',
            translate: 'كصاحب العربة',
            type: 'item',
            role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
            url: '/admin/how-join/Edit/2',
            icon: 'circle',
            // url: 'admin/dashboard/analytics'
          },
          
        ]
      },
      {
        id: 'notification',
            title: 'اعدادات الموبايل',
        translate: 'اعدادات الموبايل',
        type: 'collapsible',
        icon: 'smartphone',
        children: [
          {
            id: 'allTrucksReuest',
            title: 'عن التطبيق',
            translate: 'عن التطبيق',
            type: 'item',
            role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
            url: '/admin/about-us',
            icon: 'circle',
            // url: 'admin/dashboard/analytics'
          },
          {
            id: 'allTrucks',
            title: 'الدعم الفني',
            translate: 'الدعم الفني',
            type: 'item',
            role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
            url: '/admin/contact-us',
            icon: 'circle',
            // url: 'admin/dashboard/analytics'
          },
          
        ]
      },
      {
        id: 'Users',
        title: 'المستخدمين',
        translate: 'MENU.APPS.Users',
        type: 'item',
        icon: 'users',
        url: '/admin/users'
      },
      // {
      //   id: 'notifications',
      //   title: 'الاشعارات',
      //   translate: 'الاشعارات',
      //   type: 'item',
      //   icon: 'bell',
      //   url: '/admin/notifications'
      // }









    ]
  },
  // {
  //   id: 'pages',
  //   type: 'section',
  //   title: 'صفحات الموقع',
  //   translate: 'صفحات الموقع',
  // icon: 'package',
  //   children: [
      
  //     {
  //       id: 'frequent-questions',
  //       title: 'الاسئلة',
  //       translate: 'الاسئلة',
  //       type: 'item',
  //       icon: 'help-circle',
  //       url: '/admin/Frequent-questions'
  //     },
  //     {
  //       id: 'banners',
  //       title: 'البنرز',
  //       translate: 'البنرز',
  //       type: 'item',
  //       icon: 'image',
  //       url: '/admin/banners'
  //     },
  //     {
  //       id: 'packages',
  //       title: 'الباقات',
  //       translate: 'الباقات',
  //       type: 'item',
  //       icon: 'package',
  //       url: '/admin/Packages'
  //     },

  //     {
  //       id: 'pages',
  //       title: 'الصفحات',
  //       translate: 'الصفحات',
  //       type: 'collapsible',
  //       icon: 'archive',
  //       children: [
  //         {
  //           id: 'setAPart',
  //           title: 'ما يميزنا',
  //           translate: 'ما يميزنا',
  //           type: 'item',
  //           icon: 'star',
  //           url: '/admin/set-apart'
  //         },
  //         {
  //           id: 'services',
  //           title: 'الخدمات',
  //           translate: 'الخدمات',
  //           type: 'item',
  //           icon: 'layers',
  //           url: '/admin/services'
  //         },
  //         {
  //           id: 'how_join',
  //           title: 'كيبف تنضم؟',
  //           translate: 'كيف تنضم؟',
  //           type: 'item',
  //           icon: 'user-plus',
  //           url: '/admin/how-join'
  //         },
  //       ]
  //     },



  //     // {
  //     //   id: 'pages',
  //     //   title: 'الصفحات',
  //     //   translate: 'الصفحات',
  //     //   type: 'item',
  //     //   icon: 'archive',
  //     //   url: '/admin/Pages'
  //     // },
  //   ]
  //   }
  // User Interface
  // {
  //   id: 'marketing',
  //   type: 'section',
  //   title: 'Marketing',
  //   translate: 'MENU.MARKETING.SECTION',
  //   icon: 'layers',
  //   children: [
  //     {
  //       id: 'overview',
  //       title: 'Overview',
  //       translate: 'MENU.MARKETING.OVERVIEW',
  //       type: 'item',
  //       icon: 'bar-chart-2',
  //       url: '/admin/overview'
  //     },
  //     {
  //       id: 'coupons',
  //       title: 'Coupons',
  //       translate: 'MENU.MARKETING.COUPONS',
  //       type: 'item',
  //       icon: 'percent',
  //       url: '/admin/coupons'
  //     }
  //   ]
  // },
  // {
  //   id: 'settings',
  //   type: 'section',
  //   title: 'Settings',
  //   translate: 'MENU.SETTINGS.SECTION',
  //   icon: 'layers',
  //   children: [
     
  //     {
  //       id: 'settings2',
  //       title: 'Settings',
  //       translate: 'MENU.SETTINGS.SECTION',
  //       type: 'item',
  //       icon: 'settings',
  //       url: '/admin/settings'
  //     }
  //   ]
  // },



  //  // Sales
  //  {
  //   id: 'sales',
  //   type: 'section',
  //   title: 'Sales',
  //   translate: 'MENU.SALES.SECTION',
  //   icon: 'layers',
  //   children: [
  //     {
  //       id: 'orders',
  //       title: 'Orders',
  //       translate: 'MENU.SALES.ORDERS',
  //       type: 'item',
  //       icon: 'shopping-bag',
  //       url: '/orders'
  //     }
  //   ]
  // },
  // // Sales
  // {
  //   id: 'customers',
  //   type: 'section',
  //   title: 'Customers',
  //   translate: 'MENU.CUSTOMERS.SECTION',
  //   icon: 'layers',
  //   children: [
  //     {
  //       id: 'customers-listing',
  //       title: 'Customers Listing',
  //       translate: 'MENU.CUSTOMERS.CUSTOMERS_LISTING',
  //       type: 'item',
  //       icon: 'user',
  //       url: '/customers-listing'
  //     }
  //   ]
  // },
];
