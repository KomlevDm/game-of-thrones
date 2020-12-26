import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { GamePageComponent } from './game-page.component';
import { GamePageRoutingModule } from './game-page.routing.module';
import { InfoStatePanelComponent } from './info-state-panel/info-state-panel.component';

@NgModule({
  declarations: [GamePageComponent, InfoStatePanelComponent],
  imports: [CommonModule, GamePageRoutingModule, TranslateModule],
})
export class GamePageModule {}
