import { Player, IPlayerSettings } from './Player';
import { SIZE_FIELD_GAME_IN_PX } from '../constants/gameSettings';

export abstract class FlyingHero extends Player {
  constructor(settings: IPlayerSettings) {
    super(settings);
  }

  public stepToUp(): void {
    const newPositionTop = this.position.top - this._stepSizeInPx;

    if (newPositionTop >= 0) this.position.top = newPositionTop;
  }

  public stepToDown(): void {
    const newPositionTop = this.position.top + this._stepSizeInPx;

    if (newPositionTop + this._heightHeroInPx <= SIZE_FIELD_GAME_IN_PX.height) this.position.top = newPositionTop;
  }
}
