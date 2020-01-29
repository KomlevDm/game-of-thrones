import { EHouse } from '../../enums/EHouse';
import { GoingPlayer } from './GoingPlayer';
import { IPlayerSettings } from './Player';

export class Stark extends GoingPlayer {
  constructor(settings: IPlayerSettings) {
    super({
      ...settings,
      house: EHouse.Stark,
      attack: {
        ...settings.attack,
        name: 'attack-3.png',
        deltaTopPositionInPx: -33
      }
    });
  }
}
