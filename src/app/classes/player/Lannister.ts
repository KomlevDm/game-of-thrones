import { EHouse } from '../../enums/EHouse';
import { GoingPlayer } from './GoingPlayer';
import { IPlayerSettings } from './Player';

export class Lannister extends GoingPlayer {
  constructor(settings: IPlayerSettings) {
    super({
      ...settings,
      house: EHouse.Lannister,
      heightHeroInPx: 115,
      positionInPx: settings.positionInPx || { left: 0, top: 475 },
      attack: {
        ...settings.attack,
        name: 'attack-2.png',
        deltaTopPositionInPx: -25
      }
    });
  }
}
