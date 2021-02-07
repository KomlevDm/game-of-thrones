import { IHeroSettings } from '../../../classes/game/hero/Hero';

export interface ISaveGameData {
  sessionId: string;
  name: string;
  hero: IHeroSettings;
  date: string;
}
