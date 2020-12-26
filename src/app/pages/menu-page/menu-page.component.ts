import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPageComponent {
  constructor(public audioService: AudioService) {}

  public stateToggleLanguageDialog$ = new BehaviorSubject(false);

  public openToggleLanguageDialog(): void {
    this.audioService.shortTomahawk.restart();
    this.stateToggleLanguageDialog$.next(true);
  }
}
