import { Component, OnInit } from '@angular/core';
import { SoundsService } from './services/sounds.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public soundsService: SoundsService) {}

  ngOnInit() {
    this.soundsService.init();
  }
}
