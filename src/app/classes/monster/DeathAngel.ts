import { FlyingMonster } from './FlyingMonster';
import { FabricAttackNodeElementType } from 'src/app/types/FabricAttackNodeElementType';
import { SIZE_FIELD_GAME_IN_PX } from 'src/app/constants/gameSettings';

export class DeathAngel extends FlyingMonster {
  constructor(fabricAttackNodeElement: FabricAttackNodeElementType) {
    super({
      name: 'death-angel',
      sizeInPx: { width: 200, height: 250 },
      lives: 5,
      attack: {
        name: 'attack-4.png',
        deltaTopPositionInPx: 40,
        fabricAttackNodeElement,
        gapWithoutAttackingInPx: 60,
        widthInPx: 50
      }
    });
  }
}
