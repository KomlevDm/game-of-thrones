import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BackArrowModule } from '../../components/back-arrow/back-arrow.module';
import { EmptyMessageModule } from '../../components/empty-message/empty-message.module';
import { LoadPageComponent } from './load-page.component';
import { LoadPageRoutingModule } from './load-page.routing.module';

@NgModule({
  declarations: [LoadPageComponent],
  imports: [CommonModule, LoadPageRoutingModule, TranslateModule, BackArrowModule, EmptyMessageModule],
})
export class LoadPageModule {}
