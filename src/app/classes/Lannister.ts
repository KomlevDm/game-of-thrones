import { EHouse } from '../enums/EHouse';
import { GoingHero } from './GoingHero';
import { IPlayerSettings } from './Player';

export class Lannister extends GoingHero {
  constructor(settings: IPlayerSettings) {
    super({
      ...settings,
      house: EHouse.Lannister,
      attack: {
        name: 'attack-2.png',
        deltaTopPositionInPx: -25
      }
    });
  }
}
