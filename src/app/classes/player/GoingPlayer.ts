import { Player, IPlayerSettings } from './Player';
import { debounceTime, filter, tap, switchMap, takeWhile } from 'rxjs/operators';
import { DEBOUNCE_TIME_JUMP_IN_MS, SIZE_FIELD_GAME_IN_PX } from '../../constants/gameSettings';
import { timer, Subject } from 'rxjs';
import { EDirection } from 'src/app/enums/EDirection';

export abstract class GoingPlayer extends Player {
  constructor(settings: IPlayerSettings) {
    super({
      ...settings,
      positionInPx: settings.positionInPx || { left: 0, top: 475 },
      heightHeroInPx: 150
    });

    this._jump$
      .pipe(
        debounceTime(DEBOUNCE_TIME_JUMP_IN_MS),
        filter(() => !this._isJumpingNow),
        tap(() => (this._isJumpingNow = true)),
        switchMap(() => timer(0, 10).pipe(takeWhile(() => this._isJumpingNow)))
      )
      .subscribe(() => {
        if (this.positionInPx.top - this._stepSizeHeroInPx >= this._maxHeightJumpInPx && !this._isAchieveMaxJump) {
          this.positionInPx.top -= this._stepSizeHeroInPx;

          if (this.direction === EDirection.Right) this.stepToRight(this._horizontalJumpSizeStep);
          else this.stepToLeft(this._horizontalJumpSizeStep);
        } else if (
          this.positionInPx.top + this._stepSizeHeroInPx + this._heightHeroInPx / 2 <=
          SIZE_FIELD_GAME_IN_PX.height
        ) {
          this._isAchieveMaxJump = true;
          this.positionInPx.top += this._stepSizeHeroInPx;

          if (this.direction === EDirection.Right) this.stepToRight(this._horizontalJumpSizeStep);
          else this.stepToLeft(this._horizontalJumpSizeStep);
        } else {
          this._isAchieveMaxJump = false;
          this._isJumpingNow = false;
        }
      });
  }

  private readonly _maxHeightJumpInPx = 290;
  private readonly _horizontalJumpSizeStep = 2;
  private readonly _jump$ = new Subject<void>();

  private _isJumpingNow = false;
  private _isAchieveMaxJump = false;

  public jump(): void {
    this._jump$.next();
  }
}
