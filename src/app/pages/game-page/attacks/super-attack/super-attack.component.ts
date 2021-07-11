import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { IView } from 'src/app/classes/game/View';
import { EDirection } from '../../../../enums/EDirection';

@Component({
  selector: 'super-attack',
  templateUrl: './super-attack.component.html',
  styleUrls: ['./super-attack.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperAttackComponent implements IView {
  public name: string;
  public direction: EDirection;
  public xPositionInPx: number;
  public yTopPositionInPx: number;
  public yMiddlePositionInPx: number;
  public yBottomPositionInPx: number;

  public sizeInPx: number;

  public get topTransform(): string {
    return `translate(${this.xPositionInPx}px, ${this.yTopPositionInPx}px)`;
  }

  public get middleTransform(): string {
    return `translate(${this.xPositionInPx}px, ${this.yMiddlePositionInPx}px)`;
  }

  public get bottomTransform(): string {
    return `translate(${this.xPositionInPx}px, ${this.yBottomPositionInPx}px)`;
  }

  constructor(private readonly cdr: ChangeDetectorRef) {}

  public render(): void {
    this.cdr.markForCheck();
  }
}
