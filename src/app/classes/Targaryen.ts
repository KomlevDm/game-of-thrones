import { IPlayerSettings } from './Player';
import { EHouse } from '../enums/EHouse';
import { FlyingHero } from './FlyingHero';

export class Targaryen extends FlyingHero {
  constructor(settings: IPlayerSettings) {
    super({
      ...settings,
      house: EHouse.Targaryen,
      positionInPx: settings.positionInPx || { left: 0, top: 150 },
      heightHeroInPx: 223,
      attack: {
        name: 'fire-sphere.gif',
        deltaTopPositionInPx: -16
      }
    });
  }
}
