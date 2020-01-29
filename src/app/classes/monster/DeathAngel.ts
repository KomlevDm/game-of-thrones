import { FlyingMonster } from './FlyingMonster';
import { FabricAttackNodeElementType } from 'src/app/types/FabricAttackNodeElementType';

export class DeathAngel extends FlyingMonster {
  constructor(fabricAttackNodeElement: FabricAttackNodeElementType) {
    super({
      name: 'death-angel',
      sizeInPx: { width: 200, height: 146 },
      lives: 5,
      attack: {
        name: 'attack-4.png',
        deltaTopPositionInPx: 40,
        fabricAttackNodeElement,
        gapWithoutAttackingInPx: 60,
        sizeInPx: 50
      }
    });
  }
}
