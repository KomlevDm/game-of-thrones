import { Component, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';
import { EGameBackgroundName } from './enums/EGameBackgroundName';

@Component({
  selector: 'game-background',
  templateUrl: './game-background.component.html',
  styleUrls: ['./game-background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameBackgroundComponent {
  @Input()
  private name: EGameBackgroundName;

  @HostBinding('style.backgroundImage')
  private get backgroundImage(): string {
    return `url(/assets/pages/game-page/game-background/img/${this.name}.jpg)`;
  }
}
