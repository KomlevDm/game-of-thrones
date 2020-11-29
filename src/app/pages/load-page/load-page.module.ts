import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LoadPageComponent } from './load-page.component';
import { LoadPageRoutingModule } from './load-page.routing.module';

@NgModule({
  declarations: [LoadPageComponent],
  imports: [LoadPageRoutingModule, TranslateModule],
})
export class LoadPageModule {}
