import { EHouse } from '../../enums/EHouse';
import { GoingPlayer } from './GoingPlayer';
import { IPlayerSettings } from './Player';
import { AudioService } from 'src/app/services/audio.service';

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
        sound: AudioService.instance.lannisterAttack.restart.bind(AudioService.instance.lannisterAttack)
      }
    });
  }
}
