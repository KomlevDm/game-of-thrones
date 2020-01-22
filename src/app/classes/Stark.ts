import { EHouse } from '../enums/EHouse';
import { GoingHero } from './GoingHero';
import { IPlayerSettings } from './Player';

export class Stark extends GoingHero {
  constructor(settings: IPlayerSettings) {
    super({
      ...settings,
      house: EHouse.Stark,
      attack: {
        name: 'attack-3.png',
        deltaTopPositionInPx: -33
      }
    });
  }
}
