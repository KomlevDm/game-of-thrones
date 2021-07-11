import { Component, ChangeDetectionStrategy, HostBinding, ChangeDetectorRef } from '@angular/core';
import { IView } from 'src/app/classes/game/View';
import { EDirection } from '../../../enums/EDirection';
import { EHouse } from '../../../enums/EHouse';

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements IView {
  public house: EHouse;
  public direction = EDirection.Right;
  public xPositionInPx: number;
  public yPositionInPx: number;
  public isShieldActivated = false;

  @HostBinding('style.width.px')
  public widthInPx: number;

  @HostBinding('style.transform')
  private get transform(): string {
    return `translate(${this.xPositionInPx}px, ${this.yPositionInPx}px)`;
  }

  constructor(private readonly cdr: ChangeDetectorRef) {}

  public render(): void {
    this.cdr.markForCheck();
  }
}
