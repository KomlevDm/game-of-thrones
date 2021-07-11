import { EHouse } from '../../../enums/EHouse';
import { AGoingHero, IGoingHeroSettings } from './GoingHero';

export class Stark extends AGoingHero {
  constructor(settings: IGoingHeroSettings) {
    super({
      ...settings,
      house: EHouse.Stark,
      widthInPx: 230,
      heightInPx: 230,
      xPositionInPx: settings.xPositionInPx ?? 0,
      yPositionInPx: settings.yPositionInPx ?? 460,
      attack: {
        ...settings.attack,
        name: 'attack-3.png',
        xStartPositionInPx: 10,
        yStartPositionInPx: 30,
      },
    });
  }
}
