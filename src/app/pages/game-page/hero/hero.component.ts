import {
  Component,
  ChangeDetectionStrategy,
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
  private static readonly SPEED_TIMEOUT_IN_MS = 200;
  private static readonly TRANSITION_DELTA_IN_MS = 10;

  private readonly destroyer$ = new Subject<void>();

  constructor(private readonly elRef: ElementRef<HTMLLIElement>, public readonly cdr: ChangeDetectorRef) {}

  public heroHouse: EHouse;
  public direction = EDirection.Right;
  public isShieldActivated = false;
  @HostBinding('style.width.px') public widthInPx: number;

  public set xPositionInPx(x: number) {
    this.elRef.nativeElement.style.transform =
      this.elRef.nativeElement.style.transform.replace(/(?<=translate\()\d+/g, x.toString()) ||
      `translate(${x}px, 0px)`;
  }

  public set yPositionInPx(y: number) {
    this.elRef.nativeElement.style.transform =
      this.elRef.nativeElement.style.transform.replace(/(?<=translate\(\d+px, )\d+(?=px\))/g, y.toString()) ||
      `translate(0px, ${y}px)`;
  }

  public speed(): void {
    this.elRef.nativeElement.style.transition = `transform ${HeroComponent.SPEED_TIMEOUT_IN_MS}ms linear`;
    this.elRef.nativeElement.style.transform = this.elRef.nativeElement.style.transform += ` ${EDirection.None}`;

    timer(HeroComponent.SPEED_TIMEOUT_IN_MS + HeroComponent.TRANSITION_DELTA_IN_MS)
      .pipe(
        switchMap(() => timer(HeroComponent.SPEED_TIMEOUT_IN_MS)),
        switchMap(() => {
          this.elRef.nativeElement.style.transform = this.elRef.nativeElement.style.transform.replace(
            ` ${EDirection.None}`,
            ''
          );

          return timer(HeroComponent.SPEED_TIMEOUT_IN_MS);
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
