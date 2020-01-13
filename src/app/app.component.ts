import { Component, OnInit } from '@angular/core';
import { SoundsService } from './services/sounds.service';
import { slideInAnimation } from './route-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  constructor(public soundsService: SoundsService) {}

  private readonly startAnimationTimeoutInMs = 1000;

  ngOnInit() {
    this.soundsService.init();

    // setTimeout(() => {
    //   const body = document.querySelector('body');
    //   body.style.height = '700px';
    // }, this.startAnimationTimeoutInMs);
  }
}
