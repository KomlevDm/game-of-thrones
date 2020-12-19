import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BackArrowModule } from '../../components/back-arrow/back-arrow.module';
import { HeroSelectionPageComponent } from './hero-selection-page.component';
import { HeroSelectionPageRoutingModule } from './hero-selection-page.routing.module';

@NgModule({
  declarations: [HeroSelectionPageComponent],
  imports: [ReactiveFormsModule, HeroSelectionPageRoutingModule, TranslateModule, BackArrowModule],
})
export class HeroSelectionPageModule {}
