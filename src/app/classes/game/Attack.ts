import { EDirection } from 'src/app/enums/EDirection';
import { AttackComponent } from 'src/app/pages/game-page/attack/attack.component';
import { GameService } from 'src/app/services/game.service';
import { AView } from './View';

export class Attack extends AView<AttackComponent> {
  public static readonly DEBOUNCE_TIME_IN_MS = 80;

  constructor(settings: IAttack & { direction: EDirection }) {
    super();

    settings.sound?.();

    this.viewInit(AttackComponent);

    this.view.name = settings.name;
    this.view.sizeInPx = settings.sizeInPx;
    this.view.direction = settings.direction;
    this.view.xPositionInPx = settings.xStartPositionInPx;
    this.view.yPositionInPx = settings.yStartPositionInPx;
  }

  public render(stepSizeInPx: number): void {
    if (this.view.direction === EDirection.Right && this.view.xPositionInPx < GameService.SIZE_FIELD_GAME_IN_PX.WIDTH) {
      this.view.xPositionInPx += stepSizeInPx;
      this.view.render();

      return;
    }

    if (this.view.direction === EDirection.Left && this.view.xPositionInPx + this.view.sizeInPx > 0) {
      this.view.xPositionInPx -= stepSizeInPx;
      this.view.render();

      return;
    }

    this.viewDestroy();
  }

  public isExists(): boolean {
    return Boolean(this.view);
  }
}

export interface IAttack {
  readonly name: string;
  readonly sizeInPx: number;
  readonly xStartPositionInPx: number;
  readonly yStartPositionInPx: number;
  stepSizeInPx: number;
  readonly sound?: () => void;
}
