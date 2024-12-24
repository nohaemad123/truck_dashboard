

export const LayOutTypesArray = ['admin', 'ecommerce', 'electronics', 'fashion'] as const;
export const LayOutClasses = [
  { name: 'admin', class: 'vertical-layout' },
  { name: 'admin', menuClass: 'vertical-menu-modern' },
  { name: 'ecommerce', class: 'horizontal-layout' },
  { name: 'ecommerce', menuClass: 'horizontal-menu' },
  { name: 'electronics', class: 'electronics' },
  { name: 'fashion', class: 'fashion' },
];
export const LayOutClassesArray = LayOutClasses.map(o => o.class ?? o.menuClass);
export type LayOutTypes = typeof LayOutTypesArray[number];
export const GetLayOutClasses = (LayOut: LayOutTypes) => { return LayOutClasses.filter(o => o.name === LayOut )?.map(o => o.class ?? o.menuClass) };
export const GetLayOutMenuClasses = (LayOut: LayOutTypes) => { return LayOutClasses.filter(o => o.name === LayOut && o.menuClass)?.map(o => o.menuClass) };


const LayOutNavbarTypesArray = ['navbar-static-top', 'fixed-top', 'floating-nav', 'd-none'] as const;
export const LayOutNavbarClasses = [
  { name: 'navbar-static-top', class: 'navbar-static' },
  { name: 'navbar-static-top', menuClass: 'navbar-static-top' },
  { name: 'fixed-top', class: 'navbar-sticky' },
  { name: 'fixed-top', menuClass: 'fixed-top' },
  { name: 'floating-nav', class: 'navbar-floating' },
  { name: 'floating-nav', menuClass: 'floating-nav' },
  { name: 'd-none', class: 'navbar-hidden' },
  // { name: 'd-none', menuClass: '' },
];
export const LayOutNavbarClassesArray = LayOutNavbarClasses.map(o => o.class ?? o.menuClass);
export type LayOutNavbarTypes = typeof LayOutNavbarTypesArray[number];
export const GetLayOutNavbarClasses = (Navbar: LayOutNavbarTypes) => { return LayOutNavbarClasses.filter(o => o.name === Navbar && o.class)?.map(o => o.class) };
export const GetLayOutMenuNavbarClasses = (Navbar: LayOutNavbarTypes) => { return LayOutNavbarClasses.filter(o => o.name === Navbar && o.menuClass)?.map(o => o.menuClass) };

