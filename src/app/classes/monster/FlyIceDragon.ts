import { FlyingMonster } from './FlyingMonster';

export class FlyIceDragon extends FlyingMonster {
  constructor() {
    super({
      name: 'fly-ice-dragon',
      sizeInPx: { width: 130, height: 130 },
      lives: 1,
      cost: 100,
      attack: {
        name: 'attack-1.png',
        deltaPositionInPx: { left: 15, top: 30 },
        sizeInPx: 20
      }
    });
  }
}
