import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TopTablePageComponent } from './top-table-page.component';
import { TopTablePageRoutingModule } from './top-table-page.routing.module';

@NgModule({
  declarations: [TopTablePageComponent],
  imports: [TopTablePageRoutingModule, TranslateModule],
})
export class TopTablePageModule {}
