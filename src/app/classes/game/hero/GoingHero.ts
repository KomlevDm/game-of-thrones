import { Hero, IHeroSettings } from './Hero';

export abstract class GoingHero extends Hero {
  constructor(settings: IGoingHeroSettings) {
    super(settings);
  }
}

export interface IGoingHeroSettings extends IHeroSettings {}
