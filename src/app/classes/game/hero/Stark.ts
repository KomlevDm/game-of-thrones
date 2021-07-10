import { EHouse } from '../../../enums/EHouse';
import { AudioService } from '../../../services/audio.service';
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
        name: 'attack-7.png',
        xStartPositionInPx: 10,
        yStartPositionInPx: 30,
        sound: AudioService.instance.starkAttack.restart.bind(AudioService.instance.starkAttack),
      },
    });
  }
}
