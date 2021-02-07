import { NgModule } from '@angular/core';
import { WrapRouterOutletModule } from '../../components/wrap-router-outlet/wrap-router-outlet.module';
import { GameService } from '../../services/game.service';
import { HeroService } from '../../services/hero.service';
import { GameComponent } from './game.component';
import { GameRoutingModule } from './game.routing.module';

@NgModule({
  declarations: [GameComponent],
  imports: [GameRoutingModule, WrapRouterOutletModule],
  providers: [GameService, HeroService],
})
export class GameModule {}
