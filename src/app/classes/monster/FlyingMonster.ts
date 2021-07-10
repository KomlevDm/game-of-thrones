import { Monster, IMonsterSettings } from './Monster';
import { getRandomNumber } from 'src/app/helpers/getRandomNumber';
import { GameService } from 'src/app/services/game.service';

export abstract class FlyingMonster extends Monster {
  constructor(settings: IMonsterSettings) {
    super({
      ...settings,
      positionInPx: {
        left: GameService.SIZE_FIELD_GAME_IN_PX.WIDTH,
        top: getRandomNumber(0, GameService.SIZE_FIELD_GAME_IN_PX.HEIGHT - settings.sizeInPx.height),
      },
    });
  }

  public stepToUp(): void {
    const newPositionTop = this.positionInPx.top - this.stepSizeInPx;

    if (newPositionTop >= 0) this.positionInPx.top = newPositionTop;
  }

  public stepToDown(): void {
    const newPositionTop = this.positionInPx.top + this.stepSizeInPx;

    if (newPositionTop + this.sizeInPx.height <= GameService.SIZE_FIELD_GAME_IN_PX.HEIGHT)
      this.positionInPx.top = newPositionTop;
  }
}
