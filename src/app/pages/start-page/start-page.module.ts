import { NgModule } from '@angular/core';
import { SnowBackgroundModule } from '../../components/snow-background/snow-background.module';
import { LogoModule } from '../../components/logo/logo.module';
import { StartPageComponent } from './start-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { DecreaseModule } from '../../directives/decrease/decrease.module';

@NgModule({
  declarations: [StartPageComponent],
  imports: [TranslateModule, SnowBackgroundModule, LogoModule, DecreaseModule],
  exports: [StartPageComponent],
})
export class StartPageModule {}
