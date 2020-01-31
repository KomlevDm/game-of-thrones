import { FlyingMonster } from './FlyingMonster';

export class DeathAngel extends FlyingMonster {
  constructor() {
    super({
      name: 'death-angel',
      sizeInPx: { width: 200, height: 146 },
      lives: 5,
      cost: 500,
      attack: {
        name: 'attack-4.png',
        deltaPositionInPx: { left: 60, top: 40 },
        sizeInPx: 50
      }
    });
  }
}
