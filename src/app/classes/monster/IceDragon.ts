import { GameService } from 'src/app/services/game.service';
import { Monster } from './Monster';

export class IceDragon extends Monster {
  constructor() {
    super({
      name: 'ice-dragon',
      positionInPx: { left: GameService.SIZE_FIELD_GAME_IN_PX.WIDTH, top: 355 },
      sizeInPx: { width: 330, height: 203 },
      stepSizeInPx: 5,
      lives: 4,
      cost: 450,
      attack: {
        name: 'attack-6.png',
        deltaPositionInPx: { left: 40, top: 65 },
        sizeInPx: 40,
      },
    });
  }
}
