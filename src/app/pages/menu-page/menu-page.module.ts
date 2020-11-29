import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LogoModule } from '../../components/logo/logo.module';
import { MenuPageComponent } from './menu-page.component';
import { MenuPageRoutingModule } from './menu-page.routing.module';

@NgModule({
  declarations: [MenuPageComponent],
  imports: [MenuPageRoutingModule, TranslateModule, LogoModule],
})
export class MenuPageModule {}
