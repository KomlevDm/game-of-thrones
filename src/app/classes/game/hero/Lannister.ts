import { EHouse } from '../../../enums/EHouse';
import { AudioService } from 'src/app/services/audio.service';
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
        name: 'attack-2.png',
        xStartPositionInPx: 0,
        yStartPositionInPx: 40,
        sound: AudioService.instance.starkAttack.restart.bind(AudioService.instance.lannisterAttack),
      },
    });
  }
}
