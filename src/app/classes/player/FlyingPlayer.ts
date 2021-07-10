import { GameService } from 'src/app/services/game.service';
import { Player, IPlayerSettings } from './Player';

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

    if (newPositionTop + this.sizeInPx.height <= GameService.SIZE_FIELD_GAME_IN_PX.HEIGHT) {
      this.positionInPx.top = newPositionTop;
    }
  }
}
