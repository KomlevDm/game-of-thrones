import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SoundsService } from 'src/app/services/sounds.service';
import { getRandomMenuBgImage } from 'src/app/helpers/getRandomMenuBgImage';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {
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
