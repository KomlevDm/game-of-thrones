import { NgModule } from '@angular/core';
import { WrapRouterOutletModule } from '../../components/wrap-router-outlet/wrap-router-outlet.module';
import { GameComponent } from './game.component';
import { GameRoutingModule } from './game.routing.module';

@NgModule({
  declarations: [GameComponent],
  imports: [GameRoutingModule, WrapRouterOutletModule],
})
export class GameModule {}
