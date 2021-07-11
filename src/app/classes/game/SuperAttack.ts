import { EDirection } from 'src/app/enums/EDirection';
import { SuperAttackComponent } from 'src/app/pages/game-page/attacks/super-attack/super-attack.component';
import { GameService } from 'src/app/services/game.service';
import { AView } from './View';

export class SuperAttack extends AView<SuperAttackComponent> {
  private static readonly Y_STEP_SIZE_IN_PX = 1.2;
  private static readonly COEF_SIZE_IN_PX = 0.8;

  constructor(settings: ISuperAttack & { direction: EDirection }) {
    super();

    settings.sound?.();

    this.viewInit(SuperAttackComponent);

    this.view.name = settings.name;
    this.view.sizeInPx = settings.sizeInPx * SuperAttack.COEF_SIZE_IN_PX;
    this.view.direction = settings.direction;
    this.view.xPositionInPx = settings.xStartPositionInPx;
    this.view.yTopPositionInPx = settings.yStartPositionInPx;
    this.view.yMiddlePositionInPx = settings.yStartPositionInPx;
    this.view.yBottomPositionInPx = settings.yStartPositionInPx;
  }

  public render(stepSizeInPx: number): void {
    if (this.view.direction === EDirection.Right && this.view.xPositionInPx < GameService.SIZE_FIELD_GAME_IN_PX.WIDTH) {
      this.view.xPositionInPx += stepSizeInPx;
      this.view.yTopPositionInPx -= SuperAttack.Y_STEP_SIZE_IN_PX;
      this.view.yBottomPositionInPx += SuperAttack.Y_STEP_SIZE_IN_PX;
      this.view.render();

      return;
    }

    if (this.view.direction === EDirection.Left && this.view.xPositionInPx + this.view.sizeInPx > 0) {
      this.view.xPositionInPx -= stepSizeInPx;
      this.view.yTopPositionInPx -= SuperAttack.Y_STEP_SIZE_IN_PX;
      this.view.yBottomPositionInPx += SuperAttack.Y_STEP_SIZE_IN_PX;
      this.view.render();

      return;
    }

    this.viewDestroy();
  }

  public isExists(): boolean {
    return Boolean(this.view);
  }
}

export interface ISuperAttack {
  readonly name: string;
  readonly sizeInPx: number;
  readonly xStartPositionInPx: number;
  readonly yStartPositionInPx: number;
  stepSizeInPx: number;
  readonly sound?: () => void;
}
