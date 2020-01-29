import { Monster } from './Monster';
import { FabricAttackNodeElementType } from 'src/app/types/FabricAttackNodeElementType';
import { SIZE_FIELD_GAME_IN_PX } from 'src/app/constants/gameSettings';

export class Gin extends Monster {
  constructor(fabricAttackNodeElement: FabricAttackNodeElementType) {
    super({
      name: 'gin',
      positionInPx: { left: SIZE_FIELD_GAME_IN_PX.width, top: 350 },
      sizeInPx: { width: 180, height: 180 },
      lives: 2,
      attack: {
        name: 'attack-5.png',
        deltaTopPositionInPx: 50,
        fabricAttackNodeElement,
        gapWithoutAttackingInPx: 10
      }
    });
  }
}
