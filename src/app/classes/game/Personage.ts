import { EDirection } from '../../enums/EDirection';

export abstract class Personage {
  constructor(settings: IPersonageSettings) {
    this.name = settings.name;
    this.widthInPx = settings.widthInPx;
    this.heightInPx = settings.heightInPx;
    this.xPositionInPx = settings.xPositionInPx;
    this.yPositionInPx = settings.yPositionInPx;
    this.stepSizeInPx = settings.stepSizeInPx;
    this.direction = settings.direction;
    this._lives = settings.lives;
  }

  private isDead = false;
  private _lives: number;

  protected stepSizeInPx: number;

  public readonly name: string;
  public readonly widthInPx: number;
  public readonly heightInPx: number;

  public xPositionInPx: number;
  public yPositionInPx: number;
  public direction: EDirection;
  public get lives(): number {
    return this._lives;
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
  name: string;
  widthInPx: number;
  heightInPx: number;
  xPositionInPx: number;
  yPositionInPx: number;
  stepSizeInPx: number;
  direction: EDirection;
  lives: number;
}
