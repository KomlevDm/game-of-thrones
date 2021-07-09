import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { EDirection } from '../../../enums/EDirection';

@Component({
  selector: 'attack',
  templateUrl: './attack.component.html',
  styleUrls: ['./attack.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttackComponent implements OnDestroy {
  private readonly destroyer$ = new Subject<void>();

  private _xPositionInPx: number;
  private _yPositionInPx: number;

  public name: string;
  public direction: EDirection;
  @HostBinding('style.width.px') public sizeInPx: number;

  public set xPositionInPx(x: number) {
    this._xPositionInPx = x;

    this.elRef.nativeElement.style.transform =
      this.elRef.nativeElement.style.transform.replace(/(?<=translate\()\d+/g, x.toString()) ||
      `translate(${x}px, 0px) ${this.direction}`;
  }
  public get xPositionInPx(): number {
    return this._xPositionInPx;
  }

  public set yPositionInPx(y: number) {
    this._yPositionInPx = y;

    this.elRef.nativeElement.style.transform =
      this.elRef.nativeElement.style.transform.replace(/(?<=translate\(\d+px, )\d+(?=px\))/g, y.toString()) ||
      `translate(0px, ${y}px) ${this.direction}`;
  }
  public get yPositionInPx(): number {
    return this._yPositionInPx;
  }

  constructor(private readonly elRef: ElementRef<HTMLLIElement>) {}

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }
}
