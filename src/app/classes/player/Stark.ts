import { EHouse } from '../../enums/EHouse';
import { GoingPlayer } from './GoingPlayer';
import { IPlayerSettings } from './Player';
import { SoundsService } from 'src/app/services/sounds.service';

export class Stark extends GoingPlayer {
  constructor(settings: IPlayerSettings) {
    super({
      name: settings.name,
      house: EHouse.Stark,
      direction: settings.direction,
      positionInPx: settings.positionInPx || { left: 0, top: 410 },
      sizeInPx: { width: 225, height: 128 },
      lives: settings.lives,
      score: settings.score,
      shield: settings.shield,
      attack: {
        name: 'attack-3.png',
        deltaPositionInPx: { left: 20, top: 42 },
        sound: SoundsService.instance.starkAttack.restart.bind(SoundsService.instance.starkAttack)
      }
    });
  }
}
