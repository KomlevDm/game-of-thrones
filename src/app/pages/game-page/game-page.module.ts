import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AttackComponent } from './attack/attack.component';
import { BgComponent } from './bg/bg.component';
import { GamePageComponent } from './game-page.component';
import { GamePageRoutingModule } from './game-page.routing.module';
import { HeroComponent } from './hero/hero.component';
import { InfoStatePanelComponent } from './info-state-panel/info-state-panel.component';

@NgModule({
  declarations: [GamePageComponent, BgComponent, InfoStatePanelComponent, HeroComponent, AttackComponent],
  imports: [CommonModule, GamePageRoutingModule, TranslateModule],
})
export class GamePageModule {}
