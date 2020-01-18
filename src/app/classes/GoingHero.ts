import { Player, IPlayerSettings } from './Player';
import { debounceTime, filter, tap, switchMap, takeWhile } from 'rxjs/operators';
import { DEBOUNCE_TIME_JUMP_IN_MS, SIZE_FIELD_GAME_IN_PX } from '../constants/gameSettings';
import { timer, Subject } from 'rxjs';

export abstract class GoingHero extends Player {
  constructor(settings: IPlayerSettings) {
    super(settings);

    this.jump$
      .pipe(
        debounceTime(DEBOUNCE_TIME_JUMP_IN_MS),
        filter(() => !this._isJumpingNow),
        tap(() => (this._isJumpingNow = true)),
        switchMap(() => timer(0, 10).pipe(takeWhile(() => this._isJumpingNow)))
      )
      .subscribe(() => {
        if (this.position.top - this._stepSizeInPx >= this._maxHeightJumpInPx && !this._isAchieveMaxJump) {
          this.position.top -= this._stepSizeInPx;
        } else if (this.position.top + this._stepSizeInPx + this._heightHeroInPx <= SIZE_FIELD_GAME_IN_PX.height) {
          this._isAchieveMaxJump = true;
          this.position.top += this._stepSizeInPx;
        } else {
          this._isAchieveMaxJump = false;
          this._isJumpingNow = false;
        }
      });
  }

  private readonly _maxHeightJumpInPx = 220;
  private readonly jump$ = new Subject();

  private _isJumpingNow = false;
  private _isAchieveMaxJump = false;

  public jump(): void {
    this.jump$.next();
  }
}
