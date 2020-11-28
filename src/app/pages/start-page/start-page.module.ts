import { NgModule } from '@angular/core';
import { SnowBackgroundModule } from '../../components/snow-background/snow-background.module';
import { LogoModule } from '../../components/logo/logo.module';
import { StartPageComponent } from './start-page.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [StartPageComponent],
  imports: [TranslateModule, SnowBackgroundModule, LogoModule],
  exports: [StartPageComponent],
})
export class StartPageModule {}
