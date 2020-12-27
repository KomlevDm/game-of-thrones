import { Component, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { EDirection } from '../../../enums/EDirection';
import { EHouse } from '../../../enums/EHouse';

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  constructor(public domSanitizer: DomSanitizer) {}

  @Input() private xPositionInPx: number;
  @Input() private yPositionInPx: number;
  @Input() private direction: EDirection;

  @Input()
  @HostBinding('style.width.px')
  private widthInPx: number;

  @HostBinding('style.transform')
  private get position(): SafeStyle {
    return this.domSanitizer.bypassSecurityTrustStyle(
      `translate(${this.xPositionInPx}px, ${this.yPositionInPx}px) ${this.direction ?? ''}`
    );
  }

  @Input()
  public isShieldActivated = false;

  @Input()
  public heroHouse: EHouse;
}
