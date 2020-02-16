import { Component } from '@angular/core';
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

  public start(): void {
    if (this.isStartApp) return;

    this.isStartApp = true;
    this._soundsService.init();
  }
}
