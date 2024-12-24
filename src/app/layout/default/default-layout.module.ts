import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './default-layout.component';
import { RouterModule } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { NavbarModule } from '../components/navbar/navbar.module';
import { MenuModule } from '../components/menu/menu.module';
import { ContentModule } from '../components/content/content.module';
import { FooterModule } from '../components/footer/footer.module';



@NgModule({
  declarations: [
    DefaultLayoutComponent
  ], 
  imports: [RouterModule, CoreCommonModule, CoreSidebarModule, NavbarModule, MenuModule, ContentModule, FooterModule],
  exports: [DefaultLayoutComponent]
})
export class DefaultLayoutModule { }
