import { LayOutNavbarTypes, LayOutTypes } from "app/layout/layout-enum-classes";

// prettier-ignore
export interface CoreConfig {

  app             : {
    appName     : string;
    appTitle    : string;
    appLogoImage: string;
    appLogoImageDark?: string;
    appLanguage :'en' | 'ar'| 'fr' | 'de' | 'pt';
  };
  layout: {
    skin : 'default' | 'bordered' | 'dark' | 'semi-dark';
    type : LayOutTypes;
    animation: 'fadeInLeft'| 'zoomIn' | 'fadeIn'| 'none';
    menu : {
      hidden               : boolean;
      collapsed            : boolean;
    };
    navbar: {
      hidden               : boolean;
      type                 : LayOutNavbarTypes;
      background           : 'navbar-dark' | 'navbar-light';
      customBackgroundColor: boolean;
      backgroundColor      : string;
    };
    footer: {
      hidden               : boolean;
      type                 : 'footer-static' | 'footer-sticky' | 'd-none';
      background           : 'footer-dark' | 'footer-light';
      customBackgroundColor: boolean;
      backgroundColor      : string;
    };
    enableLocalStorage: boolean;
    customizer: boolean;
    scrollTop: boolean;
    buyNow: boolean;
  };
}
