import { Component, ChangeDetectionStrategy, Input, HostBinding, ElementRef } from '@angular/core';
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
export class HeroComponent {
  constructor(private elRef: ElementRef<HTMLLIElement>) {}

  private readonly TELEPORT_TIMEOUT_IN_MS = 1000;

  private destroyer$ = new Subject<void>();

  @Input() private xPositionInPx: number;
  @Input() private yPositionInPx: number;
  @Input() private direction: EDirection;

  @Input()
  @HostBinding('style.width.px')
  private widthInPx: number;

  @HostBinding('style.transform')
  private get position(): string {
    return `translate(${this.xPositionInPx}px, ${this.yPositionInPx}px) ${this.direction}`;
  }

  @Input()
  public isShieldActivated = false;

  @Input()
  public heroHouse: EHouse;

  public teleport(callback: Function): void {
    this.elRef.nativeElement.style.transition = `transform ${this.TELEPORT_TIMEOUT_IN_MS / 2}ms linear`;
    this.elRef.nativeElement.style.transform = this.elRef.nativeElement.style.transform.replace(
      this.direction,
      EDirection.Teleport
    );

    timer(this.TELEPORT_TIMEOUT_IN_MS / 2)
      .pipe(
        switchMap(() => {
          callback();

          return timer(this.TELEPORT_TIMEOUT_IN_MS / 2);
        }),
        switchMap(() => {
          this.elRef.nativeElement.style.transform = this.elRef.nativeElement.style.transform.replace(
            EDirection.Teleport,
            this.direction
          );

          return timer(this.TELEPORT_TIMEOUT_IN_MS / 2);
        }),

        takeUntil(this.destroyer$)
      )
      .subscribe(() => (this.elRef.nativeElement.style.transition = 'none'));
  }

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }
}
