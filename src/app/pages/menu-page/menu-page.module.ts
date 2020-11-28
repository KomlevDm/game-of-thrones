import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MenuPageComponent } from './menu-page.component';
import { MenuPageRoutingModule } from './menu-page.routing.module';

@NgModule({
  declarations: [MenuPageComponent],
  imports: [MenuPageRoutingModule, TranslateModule],
})
export class MenuPageModule {}
