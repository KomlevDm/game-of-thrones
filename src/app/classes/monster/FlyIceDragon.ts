import { FlyingMonster } from './FlyingMonster';
import { FabricAttackNodeElementType } from 'src/app/types/FabricAttackNodeElementType';

export class FlyIceDragon extends FlyingMonster {
  constructor(fabricAttackNodeElement: FabricAttackNodeElementType) {
    super({
      name: 'fly-ice-dragon',
      sizeInPx: { width: 130, height: 130 },
      lives: 1,
      attack: {
        name: 'attack-1.png',
        deltaTopPositionInPx: 30,
        fabricAttackNodeElement,
        gapWithoutAttackingInPx: 15,
        sizeInPx: 20
      }
    });
  }
}
