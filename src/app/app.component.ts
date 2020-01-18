import { Component, OnInit, HostBinding } from '@angular/core';
import { SoundsService } from './services/sounds.service';
import { slideInAnimation } from './route-animation';
import { PlayerService } from './services/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  constructor(private soundsService: SoundsService, public router: Router, public playerService: PlayerService) {}

  private readonly startAnimationTimeoutInMs = 1000;

  @HostBinding('style.height') appComponentHeight: string;

  ngOnInit() {
    this.soundsService.init();

    // setTimeout(() => {
    //   this.appComponentHeight = '700px';
    // }, this.startAnimationTimeoutInMs);
  }
}
