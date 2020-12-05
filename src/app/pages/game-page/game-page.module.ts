import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { GamePageComponent } from './game-page.component';
import { GamePageRoutingModule } from './game-page.routing.module';

@NgModule({
  declarations: [GamePageComponent],
  imports: [GamePageRoutingModule, TranslateModule],
})
export class GamePageModule {}
