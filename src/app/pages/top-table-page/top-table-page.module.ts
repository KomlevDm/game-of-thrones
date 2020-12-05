import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LogoModule } from '../../components/logo/logo.module';
import { TopTablePageComponent } from './top-table-page.component';
import { TopTablePageRoutingModule } from './top-table-page.routing.module';

@NgModule({
  declarations: [TopTablePageComponent],
  imports: [TopTablePageRoutingModule, TranslateModule, LogoModule],
})
export class TopTablePageModule {}
