import { IPlayerSettings } from './Player';
import { EHouse } from '../../enums/EHouse';
import { FlyingPlayer } from './FlyingPlayer';
import { AudioService } from 'src/app/services/audio.service';

export class Targaryen extends FlyingPlayer {
  constructor(settings: IPlayerSettings) {
    super({
      name: settings.name,
      house: EHouse.Targaryen,
      direction: settings.direction,
      positionInPx: settings.positionInPx || { left: 0, top: 150 },
      sizeInPx: { width: 225, height: 223 },
      lives: settings.lives,
      score: settings.score,
      shield: settings.shield,
      attack: {
        name: 'attack-0.webp',
        deltaPositionInPx: { left: 20, top: 94 },
        sound: AudioService.instance.targaryenAttack.restart.bind(AudioService.instance.targaryenAttack)
      }
    });
  }
}
