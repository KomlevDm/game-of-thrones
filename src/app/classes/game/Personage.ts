import { EDirection } from '../../enums/EDirection';
import { AView } from './View';

export abstract class APersonage<C> extends AView<C> {
  public readonly name: string;
  public readonly widthInPx: number;
  public readonly heightInPx: number;

  private isDead = false;
  private _lives: number;

  protected stepSizeInPx: number;

  public xPositionInPx: number;
  public yPositionInPx: number;
  public direction: EDirection;

  public get lives(): number {
    return this._lives;
  }

  constructor(settings: IPersonageSettings) {
    super();

    this.name = settings.name;
    this.widthInPx = settings.widthInPx;
    this.heightInPx = settings.heightInPx;
    this.xPositionInPx = settings.xPositionInPx;
    this.yPositionInPx = settings.yPositionInPx;
    this.stepSizeInPx = settings.stepSizeInPx;
    this.direction = settings.direction;
    this._lives = settings.lives;
  }

  public deleteLife(amount = 1): void {
    if (this.isDead) return;

    this._lives -= amount;

    if (this._lives <= 0) {
      this.isDead = true;
    }
  }
}

export interface IPersonageSettings {
  readonly name: string;
  readonly widthInPx: number;
  readonly heightInPx: number;
  readonly xPositionInPx: number;
  readonly yPositionInPx: number;
  readonly stepSizeInPx: number;
  readonly direction: EDirection;
  readonly lives: number;
}
