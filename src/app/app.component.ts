import { Component, HostBinding } from '@angular/core';
import { SoundsService } from './services/sounds.service';
import { slideInAnimation } from './route-animation';
import { GameService } from './services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  constructor(private _soundsService: SoundsService, public router: Router, public gameService: GameService) {}

  public isStartApp = false;

  @HostBinding('style.height') appComponentHeight: string;
  @HostBinding('style.border') appComponentBorder: string;

  public start(): void {
    if (this.isStartApp) return;

    this.isStartApp = true;
    this._soundsService.init();
    this.appComponentHeight = '700px';
    this.appComponentBorder = '10px double white';
  }
}
