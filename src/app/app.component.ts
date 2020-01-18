import { Component, OnInit, HostBinding } from '@angular/core';
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
export class AppComponent implements OnInit {
  constructor(private _soundsService: SoundsService, public router: Router, public gameService: GameService) {}

  private readonly _startAnimationTimeoutInMs = 1000;

  @HostBinding('style.height') appComponentHeight: string;

  ngOnInit() {
    this._soundsService.init();

    // setTimeout(() => {
    //   this.appComponentHeight = '700px';
    // }, this._startAnimationTimeoutInMs);
  }
}
