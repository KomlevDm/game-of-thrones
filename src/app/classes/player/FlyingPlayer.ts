import { Player, IPlayerSettings } from './Player';
import { SIZE_FIELD_GAME_IN_PX } from '../../constants/gameSettings';

export abstract class FlyingPlayer extends Player {
  constructor(settings: IPlayerSettings) {
    super(settings);
  }

  public stepToUp(): void {
    const newPositionTop = this.positionInPx.top - this._stepSizeInPx;

    if (newPositionTop >= 0) this.positionInPx.top = newPositionTop;
  }

  public stepToDown(): void {
    const newPositionTop = this.positionInPx.top + this._stepSizeInPx;

    if (newPositionTop + this.sizeInPx.height <= SIZE_FIELD_GAME_IN_PX.height) {
      this.positionInPx.top = newPositionTop;
    }
  }
}
