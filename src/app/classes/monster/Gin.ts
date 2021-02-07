import { Monster } from './Monster';
import { SIZE_FIELD_GAME_IN_PX } from 'src/app/constants/gameParams';

export class Gin extends Monster {
  constructor() {
    super({
      name: 'gin',
      positionInPx: { left: SIZE_FIELD_GAME_IN_PX.width, top: 350 },
      sizeInPx: { width: 180, height: 180 },
      lives: 2,
      cost: 300,
      attack: {
        name: 'attack-5.png',
        deltaPositionInPx: { left: 10, top: 50 }
      }
    });
  }
}
