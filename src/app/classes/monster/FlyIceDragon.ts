import { FlyingMonster } from './FlyingMonster';
import { FabricAttackNodeElementType } from 'src/app/types/FabricAttackNodeElementType';
import { SIZE_FIELD_GAME_IN_PX } from 'src/app/constants/gameSettings';

export class FlyIceDragon extends FlyingMonster {
  constructor(fabricAttackNodeElement: FabricAttackNodeElementType) {
    super({
      name: 'fly-ice-dragon',
      sizeInPx: { width: 130, height: 230 },
      lives: 1,
      attack: {
        name: 'attack-1.png',
        deltaTopPositionInPx: 30,
        fabricAttackNodeElement,
        gapWithoutAttackingInPx: 15,
        widthInPx: 20
      }
    });
  }
}
