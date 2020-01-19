import { EHouse } from '../enums/EHouse';
import { EDirection } from '../enums/EDirection';
import { SIZE_FIELD_GAME_IN_PX } from '../constants/gameSettings';

interface IPosition {
  left: number;
  top: number;
}

export interface IPlayerSettings {
  name: string;
  house: EHouse;
  direction: string;
  position: IPosition;
  heightHeroInPx: number;
  lives: number;
  score: number;
}

export abstract class Player {
  static defaultName = 'Player';

  constructor({ name, house, heightHeroInPx, direction, position, lives, score }: IPlayerSettings) {
    console.log(heightHeroInPx);
    this._name = name || Player.defaultName;
    this._house = house;
    this._heightHeroInPx = heightHeroInPx;
    this._direction = direction || 'unset';
    this._position = position;
    this._lives = lives || 5;
    this._score = score || 0;
  }

  private readonly _name: string;
  private readonly _house: EHouse;
  private readonly _widthHeroInPx = 225;

  protected readonly _heightHeroInPx: number;
  protected readonly _stepSizeInPx = 5;

  private _direction: string;
  private _position: IPosition;
  private _lives: number;
  private _score: number;

  public isActivatedShield: boolean;

  public get name(): string {
    return this._name;
  }

  public get house(): EHouse {
    return this._house;
  }

  public get direction(): string {
    return this._direction;
  }

  public get position(): IPosition {
    return this._position;
  }

  public get lives(): number {
    return this._lives;
  }

  public get score(): number {
    return this._score;
  }

  public get widthHeroInPx(): number {
    return this._widthHeroInPx;
  }

  public stepToLeft(): void {
    const newPositionLeft = this.position.left - this._stepSizeInPx;

    if (newPositionLeft >= 0) {
      this._setDirection(EDirection.Left);
      this.position.left = newPositionLeft;
    }
  }

  public stepToRight(): void {
    const newPositionLeft = this.position.left + this._stepSizeInPx;

    if (newPositionLeft + this._widthHeroInPx <= SIZE_FIELD_GAME_IN_PX.width) {
      this._setDirection(EDirection.Right);
      this.position.left = newPositionLeft;
    }
  }

  public deleteLife(): void {
    this._lives -= 1;
  }

  public increaseScore(value: number): void {
    this._score += value;
  }

  private _setDirection(direction: EDirection): void {
    switch (direction) {
      case EDirection.Left:
        this._direction = 'scale(-1, 1)';
        break;

      case EDirection.Right:
        this._direction = 'unset';
        break;
    }
  }
}
