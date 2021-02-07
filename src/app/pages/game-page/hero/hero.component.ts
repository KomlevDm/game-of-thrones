import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  ElementRef,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { Subject, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { EDirection } from '../../../enums/EDirection';
import { EHouse } from '../../../enums/EHouse';

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements OnDestroy {
  constructor(private elRef: ElementRef<HTMLLIElement>, public cdr: ChangeDetectorRef) {}

  private readonly SPEED_TIMEOUT_IN_MS = 200;
  private readonly TRANSITION_DELTA_IN_MS = 10;

  private destroyer$ = new Subject<void>();

  @Input()
  public set xPositionInPx(x: number) {
    this.elRef.nativeElement.style.transform =
      this.elRef.nativeElement.style.transform.replace(/(?<=translate\()\d+/g, x.toString()) ||
      `translate(${x}px, 0px)`;
  }

  @Input()
  public set yPositionInPx(y: number) {
    this.elRef.nativeElement.style.transform =
      this.elRef.nativeElement.style.transform.replace(/(?<=translate\(\d+px, )\d+(?=px\))/g, y.toString()) ||
      `translate(0px, ${y}px)`;
  }

  @Input()
  @HostBinding('style.width.px')
  public widthInPx: number;

  @Input()
  public direction: EDirection;

  @Input()
  public isShieldActivated = false;

  @Input()
  public heroHouse: EHouse;

  public speed(): void {
    this.elRef.nativeElement.style.transition = `transform ${this.SPEED_TIMEOUT_IN_MS}ms linear`;
    this.elRef.nativeElement.style.transform = this.elRef.nativeElement.style.transform += ` ${EDirection.None}`;

    timer(this.SPEED_TIMEOUT_IN_MS + this.TRANSITION_DELTA_IN_MS)
      .pipe(
        switchMap(() => timer(this.SPEED_TIMEOUT_IN_MS)),
        switchMap(() => {
          this.elRef.nativeElement.style.transform = this.elRef.nativeElement.style.transform.replace(
            ` ${EDirection.None}`,
            ''
          );

          return timer(this.SPEED_TIMEOUT_IN_MS);
        }),
        takeUntil(this.destroyer$)
      )
      .subscribe(() => (this.elRef.nativeElement.style.transition = 'unset'));
  }

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }
}
