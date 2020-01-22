import { Player, IPlayerSettings } from './Player';
import { SIZE_FIELD_GAME_IN_PX } from '../constants/gameSettings';

export abstract class FlyingHero extends Player {
  constructor(settings: IPlayerSettings) {
    super(settings);
  }

  public stepToUp(): void {
    const newPositionTop = this.positionInPx.top - this._stepSizeHeroInPx;

    if (newPositionTop - this._heightHeroInPx / 2 >= 0) this.positionInPx.top = newPositionTop;
  }

  public stepToDown(): void {
    const newPositionTop = this.positionInPx.top + this._stepSizeHeroInPx;

    if (newPositionTop + this._heightHeroInPx / 2 <= SIZE_FIELD_GAME_IN_PX.height) {
      this.positionInPx.top = newPositionTop;
    }
  }
}
