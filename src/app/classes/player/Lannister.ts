import { EHouse } from '../../enums/EHouse';
import { GoingPlayer } from './GoingPlayer';
import { IPlayerSettings } from './Player';
import { SoundsService } from 'src/app/services/sounds.service';

export class Lannister extends GoingPlayer {
  constructor(settings: IPlayerSettings) {
    super({
      name: settings.name,
      house: EHouse.Lannister,
      direction: settings.direction,
      positionInPx: settings.positionInPx || { left: 0, top: 425 },
      sizeInPx: { width: 225, height: 115 },
      lives: settings.lives,
      score: settings.score,
      shield: settings.shield,
      attack: {
        name: 'attack-2.png',
        deltaPositionInPx: { left: 20, top: 40 },
        sound: SoundsService.instance.lannisterAttack.restart.bind(SoundsService.instance.lannisterAttack)
      }
    });
  }
}
