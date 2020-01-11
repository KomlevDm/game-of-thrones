import { Component, HostBinding } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SoundsService } from 'src/app/services/sounds.service';
import { getRandomMenuBgImage } from 'src/app/helpers/getRandomMenuBgImage';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {
  constructor(public soundsService: SoundsService) {}

  public stateToggleLanguageDialog$ = new BehaviorSubject(false);

  public bgImageName = getRandomMenuBgImage();

  public mouseenterFireSphere() {
    this.soundsService.dragonFlame.play();
  }

  public mouseenterButtonMenu() {
    this.soundsService.blade.restart();
  }

  public openToggleLanguageDialog() {
    this.soundsService.shortTomahawk.restart();
    this.stateToggleLanguageDialog$.next(true);
  }
}
