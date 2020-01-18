import { EHouse } from '../enums/EHouse';
import { GoingHero } from './GoingHero';
import { IPlayerSettings } from './Player';

export class Lannister extends GoingHero {
  constructor(settings: IPlayerSettings) {
    super({
      ...settings,
      house: EHouse.Lannister,
      position: settings.position || { left: 0, top: 410 },
      heightHeroInPx: 140
    });
  }
}
