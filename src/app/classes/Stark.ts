import { EHouse } from '../enums/EHouse';
import { GoingHero } from './GoingHero';
import { IPlayerSettings } from './Player';

export class Stark extends GoingHero {
  constructor(settings: IPlayerSettings) {
    super({
      ...settings,
      house: EHouse.Stark,
      position: settings.position || { left: 0, top: 400 },
      heightHeroInPx: 150
    });
  }
}
