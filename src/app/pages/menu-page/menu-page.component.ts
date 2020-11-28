import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SoundsService } from 'src/app/services/sounds.service';
import { getRandomMenuBgImage } from 'src/app/helpers/getRandomMenuBgImage';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPageComponent {
  constructor(public soundsService: SoundsService, public gameService: GameService) {}

  public stateToggleLanguageDialog$ = new BehaviorSubject(false);
  public bgImageName = getRandomMenuBgImage();

  public mouseenterFireSphere(): void {
    this.soundsService.dragonFlame.play();
  }

  public openToggleLanguageDialog(): void {
    this.soundsService.shortTomahawk.restart();
    this.stateToggleLanguageDialog$.next(true);
  }
}
