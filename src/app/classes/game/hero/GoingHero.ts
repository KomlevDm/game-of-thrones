import { debounceTime, filter, Observable, Subject } from 'rxjs';
import { AudioService } from 'src/app/services/audio.service';
import { AHero, IHeroSettings } from './Hero';

export abstract class AGoingHero extends AHero {
  private static readonly DEBOUNCE_TIME_JUMP_IN_MS = 100;
  private static readonly MAX_HEIGHT_JUMP_IN_PX = 120;

  private readonly jump$ = new Subject<void>();
  private readonly jumpStepSizeInPx: number;
  private readonly yStartPositionInPx: number;

  private isJumping = false;
  private isAchieveMaxJump = false;

  constructor(settings: IGoingHeroSettings) {
    super(settings);

    this.jumpStepSizeInPx = settings.jumpStepSizeInPx ?? 15;
    this.yStartPositionInPx = this.yPositionInPx;

    this.jump$
      .pipe(
        debounceTime(AGoingHero.DEBOUNCE_TIME_JUMP_IN_MS),
        filter(() => !this.isJumping)
      )
      .subscribe(() => {
        this.isJumping = true;

        this.jumpRender();
      });
  }

  public jump(): void {
    this.jump$.next();
  }

  private jumpRender(): Observable<number> {
    if (!this.isJumping) return;

    if (!this.isAchieveMaxJump) {
      this.yPositionInPx -= this.jumpStepSizeInPx;

      if (this.yPositionInPx <= AGoingHero.MAX_HEIGHT_JUMP_IN_PX) {
        this.isAchieveMaxJump = true;
      }

      requestAnimationFrame(this.jumpRender.bind(this));

      return;
    }

    if (this.yPositionInPx + this.jumpStepSizeInPx <= this.yStartPositionInPx) {
      this.yPositionInPx += this.jumpStepSizeInPx;

      requestAnimationFrame(this.jumpRender.bind(this));

      return;
    }

    this.isJumping = false;
    this.isAchieveMaxJump = false;
    this.yPositionInPx = this.yStartPositionInPx;
  }
}

export interface IGoingHeroSettings extends IHeroSettings {
  readonly jumpStepSizeInPx: number;
}
