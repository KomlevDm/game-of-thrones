import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BackArrowModule } from '../../components/back-arrow/back-arrow.module';
import { EmptyMessageModule } from '../../components/empty-message/empty-message.module';
import { TopTablePageComponent } from './top-table-page.component';
import { TopTablePageRoutingModule } from './top-table-page.routing.module';

@NgModule({
  declarations: [TopTablePageComponent],
  imports: [CommonModule, TopTablePageRoutingModule, TranslateModule, BackArrowModule, EmptyMessageModule],
})
export class TopTablePageModule {}
