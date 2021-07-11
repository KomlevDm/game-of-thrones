import { EHouse } from '../../../enums/EHouse';
import { AGoingHero, IGoingHeroSettings } from './GoingHero';

export class Lannister extends AGoingHero {
  constructor(settings: IGoingHeroSettings) {
    super({
      ...settings,
      house: EHouse.Lannister,
      widthInPx: 260,
      heightInPx: 260,
      xPositionInPx: settings.xPositionInPx ?? 0,
      yPositionInPx: settings.yPositionInPx ?? 430,
      attack: {
        ...settings.attack,
        name: 'attack-5.webp',
        xStartPositionInPx: 0,
        yStartPositionInPx: 40,
      },
    });
  }
}
