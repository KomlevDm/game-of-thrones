import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { EDirection } from '../../../enums/EDirection';

@Component({
  selector: 'attack',
  templateUrl: './attack.component.html',
  styleUrls: ['./attack.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttackComponent implements OnDestroy {
  constructor(private elRef: ElementRef<HTMLLIElement>, public cdr: ChangeDetectorRef) {}

  private destroyer$ = new Subject<void>();
  private _xPositionInPx: number;
  private _yPositionInPx: number;

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

  @HostBinding('style.width.px')
  public sizeInPx: number;

  public name: string;

  public direction: EDirection;

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }
}
