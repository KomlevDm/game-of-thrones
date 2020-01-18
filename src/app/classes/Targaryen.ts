import { IPlayerSettings } from './Player';
import { EHouse } from '../enums/EHouse';
import { FlyingHero } from './FlyingHero';

export class Targaryen extends FlyingHero {
  constructor(settings: IPlayerSettings) {
    super({
      ...settings,
      house: EHouse.Targaryen,
      position: settings.position || { left: 0, top: 150 },
      heightHeroInPx: 223
    });
  }
}
