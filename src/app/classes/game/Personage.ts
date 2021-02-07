import { EDirection } from '../../enums/EDirection';

export abstract class Personage {
  constructor({
    name,
    widthInPx,
    heightInPx,
    xPositionInPx,
    yPositionInPx,
    stepSizeInPx,
    direction,
    lives,
  }: IPersonageSettings) {
    this.name = name;
    this.widthInPx = widthInPx;
    this.heightInPx = heightInPx;
    this.xPositionInPx = xPositionInPx;
    this.yPositionInPx = yPositionInPx;
    this.stepSizeInPx = stepSizeInPx;
    this.direction = direction;
    this._lives = lives;
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
