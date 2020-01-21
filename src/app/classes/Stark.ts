import { EHouse } from '../enums/EHouse';
import { GoingHero } from './GoingHero';
import { IPlayerSettings } from './Player';

export class Stark extends GoingHero {
  constructor(settings: IPlayerSettings) {
    super({
      ...settings,
      house: EHouse.Stark,
      positionInPx: settings.positionInPx || { left: 0, top: 400 },
      heightHeroInPx: 150,
      attack: {
        name: 'attack-3.png',
        deltaTopPositionInPx: -40
      }
    });
  }
}
