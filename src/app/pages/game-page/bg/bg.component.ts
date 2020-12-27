import { Component, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { EBgGame } from './enums/EBgGame';

@Component({
  selector: 'bg',
  templateUrl: './bg.component.html',
  styleUrls: ['./bg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BgComponent {
  constructor(public domSanitizer: DomSanitizer) {}

  @Input()
  private bgName: EBgGame;

  @HostBinding('style.backgroundImage')
  private get backgroundImage(): SafeStyle {
    return this.domSanitizer.bypassSecurityTrustStyle(`url(/assets/pages/game-page/bg/img/${this.bgName}.webp)`);
  }
}
