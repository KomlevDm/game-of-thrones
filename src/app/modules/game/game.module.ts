import { NgModule } from '@angular/core';
import { ArtifactService } from 'src/app/services/artifact.service';
import { WrapRouterOutletModule } from '../../components/wrap-router-outlet/wrap-router-outlet.module';
import { GameService } from '../../services/game.service';
import { HeroService } from '../../services/hero.service';
import { GameComponent } from './game.component';
import { GameRoutingModule } from './game.routing.module';

@NgModule({
  declarations: [GameComponent],
  imports: [GameRoutingModule, WrapRouterOutletModule],
  providers: [GameService, HeroService, ArtifactService],
})
export class GameModule {}
