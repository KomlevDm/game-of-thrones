import { Component, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';
import { EBgGame } from './enums/EBgGame';

@Component({
  selector: 'bg',
  templateUrl: './bg.component.html',
  styleUrls: ['./bg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BgComponent {
  @Input()
  private bgName: EBgGame;

  @HostBinding('style.backgroundImage')
  private get backgroundImage(): string {
    return `url(/assets/pages/game-page/bg/img/${this.bgName}.jpg)`;
  }
}
