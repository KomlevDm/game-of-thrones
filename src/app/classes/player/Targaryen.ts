import { IPlayerSettings } from './Player';
import { EHouse } from '../../enums/EHouse';
import { FlyingPlayer } from './FlyingPlayer';
import { SoundsService } from 'src/app/services/sounds.service';

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
        name: 'fire-sphere.gif',
        deltaPositionInPx: { left: 20, top: -16 },
        sound: SoundsService.instance.targaryenAttack.restart.bind(SoundsService.instance.targaryenAttack)
      }
    });
  }
}
