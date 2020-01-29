import { EHouse } from '../../enums/EHouse';
import { GoingPlayer } from './GoingPlayer';
import { IPlayerSettings } from './Player';

export class Stark extends GoingPlayer {
  constructor(settings: IPlayerSettings) {
    super({
      ...settings,
      house: EHouse.Stark,
      heightHeroInPx: 128,
      positionInPx: settings.positionInPx || { left: 0, top: 475 },
      attack: {
        ...settings.attack,
        name: 'attack-3.png',
        deltaTopPositionInPx: -33
      }
    });
  }
}
