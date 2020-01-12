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

  ngOnInit() {
    this.soundsService.init();
  }
}
