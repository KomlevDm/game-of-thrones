import { IPlayerSettings } from '../../../classes/player/Player';

export interface ISaveGameData {
  sessionId: string;
  name: string;
  player: IPlayerSettings;
  date: string;
}
