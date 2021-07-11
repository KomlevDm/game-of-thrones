import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding } from '@angular/core';
import { IView } from 'src/app/classes/game/View';
import { EDirection } from '../../../../enums/EDirection';

@Component({
  selector: 'attack',
  templateUrl: './attack.component.html',
  styleUrls: ['./attack.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttackComponent implements IView {
  public name: string;
  public direction: EDirection;
  public xPositionInPx: number;
  public yPositionInPx: number;

  @HostBinding('style.width.px')
  public sizeInPx: number;

  @HostBinding('style.transform')
  private get transform(): string {
    return `translate(${this.xPositionInPx}px, ${this.yPositionInPx}px)`;
  }

  constructor(private readonly cdr: ChangeDetectorRef) {}

  public render(): void {
    this.cdr.markForCheck();
  }
}
