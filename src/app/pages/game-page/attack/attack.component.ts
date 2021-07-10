import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding } from '@angular/core';
import { IView } from 'src/app/classes/game/View';
import { EDirection } from '../../../enums/EDirection';

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
    return (
      this.elRef.nativeElement.style.transform
        .replace(/(?<=translate\()\d+/g, `${this.xPositionInPx}`)
        .replace(/(?<=translate\(\d+px, )\d+(?=px\))/g, `${this.yPositionInPx}`) ||
      `translate(${this.xPositionInPx}px, ${this.yPositionInPx}px)`
    );
  }

  constructor(private readonly elRef: ElementRef<HTMLLIElement>, private readonly cdr: ChangeDetectorRef) {}

  public render(): void {
    this.cdr.markForCheck();
  }
}
