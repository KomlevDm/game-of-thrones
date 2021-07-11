import { GameService } from 'src/app/services/game.service';
import { AHero, IHeroSettings } from './Hero';

export abstract class AFlyingHero extends AHero {
  constructor(settings: IFlyingHeroSettings) {
    super(settings);
  }

  public stepToUp(): void {
    const y = this.yPositionInPx - this.stepSizeInPx;

    if (y >= 0) {
      this.yPositionInPx = y;
    }
  }

  public stepToDown(): void {
    const y = this.yPositionInPx + this.stepSizeInPx;

    if (y + this.heightInPx <= GameService.SIZE_FIELD_GAME_IN_PX.FLYING_HEIGHT) {
      this.yPositionInPx = y;
    }
  }
}

export interface IFlyingHeroSettings extends IHeroSettings {}
