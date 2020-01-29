import { IPlayerSettings } from './Player';
import { EHouse } from '../../enums/EHouse';
import { FlyingPlayer } from './FlyingPlayer';

export class Targaryen extends FlyingPlayer {
  constructor(settings: IPlayerSettings) {
    super({
      ...settings,
      house: EHouse.Targaryen,
      positionInPx: settings.positionInPx || { left: 0, top: 260 },
      heightHeroInPx: 223,
      attack: {
        ...settings.attack,
        name: 'fire-sphere.gif',
        deltaTopPositionInPx: -16
      }
    });
  }
}
