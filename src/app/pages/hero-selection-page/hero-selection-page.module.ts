import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeroSelectionPageComponent } from './hero-selection-page.component';
import { HeroSelectionPageRoutingModule } from './hero-selection-page.routing.module';

@NgModule({
  declarations: [HeroSelectionPageComponent],
  imports: [HeroSelectionPageRoutingModule, TranslateModule],
})
export class HeroSelectionPageModule {}
