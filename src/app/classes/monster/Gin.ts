import { Monster } from './Monster';
import { GameService } from 'src/app/services/game.service';

export class Gin extends Monster {
  constructor() {
    super({
      name: 'gin',
      positionInPx: { left: GameService.SIZE_FIELD_GAME_IN_PX.WIDTH, top: 350 },
      sizeInPx: { width: 180, height: 180 },
      lives: 2,
      cost: 300,
      attack: {
        name: 'attack-5.png',
        deltaPositionInPx: { left: 10, top: 50 },
      },
    });
  }
}
