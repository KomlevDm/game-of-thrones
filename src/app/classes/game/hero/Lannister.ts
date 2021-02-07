import { EHouse } from '../../../enums/EHouse';
import { AudioService } from 'src/app/services/audio.service';
import { GoingHero, IGoingHeroSettings } from './GoingHero';

export class Lannister extends GoingHero {
  constructor(settings: IGoingHeroSettings) {
    super({
      ...settings,
      house: EHouse.Lannister,
      widthInPx: settings.widthInPx ?? 260,
      //TODO
      // heightInPx: settings.heightInPx ??  ,
      xPositionInPx: settings.xPositionInPx ?? 0,
      yPositionInPx: settings.yPositionInPx ?? 430,
      attack: {
        ...settings.attack,
        name: 'attack-2.png',
        xPositionInPx: 0,
        yPositionInPx: 40,
        sound: AudioService.instance.starkAttack.restart.bind(AudioService.instance.lannisterAttack),
      },
    });
  }
}
