import { EHouse } from 'src/app/enums/EHouse';
import { AFlyingHero, IFlyingHeroSettings } from './FlyingHero';

export class Targaryen extends AFlyingHero {
  constructor(settings: IFlyingHeroSettings) {
    super({
      ...settings,
      house: EHouse.Targaryen,
      widthInPx: 260,
      heightInPx: 260,
      xPositionInPx: settings.xPositionInPx ?? 0,
      yPositionInPx: settings.yPositionInPx ?? 120,
      attack: {
        ...settings.attack,
        name: 'attack-0.webp',
        xStartPositionInPx: 20,
        yStartPositionInPx: 110,
      },
    });
  }
}
