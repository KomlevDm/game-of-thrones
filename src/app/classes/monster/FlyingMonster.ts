import { SIZE_FIELD_GAME_IN_PX } from '../../constants/gameSettings';
import { Monster, IMonsterSettings } from './Monster';
import { getRandomNumber } from 'src/app/helpers/getRandomNumber';

export abstract class FlyingMonster extends Monster {
  constructor(settings: IMonsterSettings) {
    super({
      ...settings,
      positionInPx: {
        left: SIZE_FIELD_GAME_IN_PX.width,
        top: getRandomNumber(0, SIZE_FIELD_GAME_IN_PX.height - settings.sizeInPx.height)
      }
    });
  }

  public stepToUp(): void {
    const newPositionTop = this.positionInPx.top - this._stepSizeMonsterInPx;

    if (newPositionTop >= 0) this.positionInPx.top = newPositionTop;
  }

  public stepToDown(): void {
    const newPositionTop = this.positionInPx.top + this._stepSizeMonsterInPx;

    if (newPositionTop + this.sizeInPx.height <= SIZE_FIELD_GAME_IN_PX.height) this.positionInPx.top = newPositionTop;
  }
}
