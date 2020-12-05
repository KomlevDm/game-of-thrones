import { NgModule } from '@angular/core';
import { SpinnerModule } from '../../components/spinner/spinner.module';
import { WrapRouterOutletModule } from '../../components/wrap-router-outlet/wrap-router-outlet.module';
import { GameComponent } from './game.component';
import { GameRoutingModule } from './game.routing.module';

@NgModule({
  declarations: [GameComponent],
  imports: [GameRoutingModule, WrapRouterOutletModule, SpinnerModule],
})
export class GameModule {}
