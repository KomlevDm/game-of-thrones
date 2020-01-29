import { Monster } from './Monster';
import { FabricAttackNodeElementType } from 'src/app/types/FabricAttackNodeElementType';
import { SIZE_FIELD_GAME_IN_PX } from 'src/app/constants/gameSettings';

export class IceDragon extends Monster {
  constructor(fabricAttackNodeElement: FabricAttackNodeElementType) {
    super({
      name: 'ice-dragon',
      positionInPx: { left: SIZE_FIELD_GAME_IN_PX.width, top: 395 },
      sizeInPx: { width: 250, height: 150 },
      stepSizeMonsterInPx: 5,
      lives: 4,
      attack: {
        name: 'attack-6.png',
        deltaTopPositionInPx: 55,
        fabricAttackNodeElement,
        gapWithoutAttackingInPx: 40,
        widthInPx: 40
      }
    });
  }
}
