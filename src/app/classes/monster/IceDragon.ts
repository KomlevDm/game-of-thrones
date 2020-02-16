import { Monster } from './Monster';
import { SIZE_FIELD_GAME_IN_PX } from 'src/app/constants/gameSettings';

export class IceDragon extends Monster {
  constructor() {
    super({
      name: 'ice-dragon',
      positionInPx: { left: SIZE_FIELD_GAME_IN_PX.width, top: 355 },
      sizeInPx: { width: 330, height: 203 },
      stepSizeInPx: 5,
      lives: 4,
      cost: 450,
      attack: {
        name: 'attack-6.png',
        deltaPositionInPx: { left: 40, top: 65 },
        sizeInPx: 40
      }
    });
  }
}
