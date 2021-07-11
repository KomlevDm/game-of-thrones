import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AttackComponent } from './attacks/attack/attack.component';
import { SuperAttackComponent } from './attacks/super-attack/super-attack.component';
import { GameBackgroundComponent } from './game-background/game-background.component';
import { GamePageComponent } from './game-page.component';
import { GamePageRoutingModule } from './game-page.routing.module';
import { HeroComponent } from './hero/hero.component';
import { InfoStatePanelComponent } from './info-state-panel/info-state-panel.component';

@NgModule({
  declarations: [
    GamePageComponent,
    GameBackgroundComponent,
    InfoStatePanelComponent,
    HeroComponent,
    AttackComponent,
    SuperAttackComponent,
  ],
  imports: [CommonModule, GamePageRoutingModule, TranslateModule],
})
export class GamePageModule {}
