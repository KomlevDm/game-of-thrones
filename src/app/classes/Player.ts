import { EHouse } from '../enums/EHouse';
import { EDirection } from '../enums/EDirection';
import { SIZE_FIELD_GAME_IN_PX, DEBOUNCE_TIME_ATTACK_IN_MS } from '../constants/gameSettings';
import { EmbeddedViewRef } from '@angular/core';
import { debounceTime, switchMap, mergeMap } from 'rxjs/operators';
import { Subject, timer } from 'rxjs';

type FabricAttackNodeElementType = (
  settings: ISettingsAttackNodeElement
) => EmbeddedViewRef<ISettingsAttackNodeElement>;

interface IPosition {
  left: number;
  top: number;
}

interface IAttack {
  name: string;
  deltaTopPositionInPx: number;
  deltaLeftPositionInPx: number;
  stepSizeInPx: number;
  widthInPx: number;
  gapWithoutHeroInPx: number;
  fabricAttackNodeElement: FabricAttackNodeElementType;
  attack$: Subject<string>;
}

interface IAttackObject {
  attackNodeElement: EmbeddedViewRef<ISettingsAttackNodeElement>;
  direction: string;
}

export interface ISettingsAttackNodeElement extends IPosition {
  name: string;
  width: number;
  animationDirection: EDirection;
}

export interface IPlayerSettings {
  name: string;
  house: EHouse;
  direction: string;
  positionInPx: IPosition;
  heightHeroInPx: number;
  lives: number;
  score: number;
  isActivatedShield: boolean;
  isBlockedShield: boolean;
  attack: {
    name: string;
    deltaTopPositionInPx: number;
  };
}

export abstract class Player {
  static defaultName = 'Player';

  constructor({
    name,
    house,
    heightHeroInPx,
    direction,
    positionInPx,
    lives,
    score,
    isActivatedShield,
    isBlockedShield,
    attack
  }: IPlayerSettings) {
    this._name = name || Player.defaultName;
    this._house = house;
    this._heightHeroInPx = heightHeroInPx;
    this._direction = direction || EDirection.Right;
    this._positionInPx = positionInPx;
    this._lives = lives || 5;
    this._score = score || 0;
    this._isActivatedShield = isActivatedShield || false;
    this._isBlockedShield = isBlockedShield || false;

    this._attack = {
      ...attack,
      deltaLeftPositionInPx: 30,
      stepSizeInPx: 10,
      widthInPx: 30,
      gapWithoutHeroInPx: 20,
      fabricAttackNodeElement: null,
      attack$: new Subject<string>()
    };
    this._attack.attack$.pipe(debounceTime(DEBOUNCE_TIME_ATTACK_IN_MS)).subscribe(attackDirection => {
      const independentSettings = {
        name: this._attack.name,
        top: this._positionInPx.top + this._attack.deltaTopPositionInPx,
        width: this._attack.widthInPx
      };

      const dependentSettings =
        attackDirection === EDirection.Right
          ? {
              left:
                this._positionInPx.left +
                this._widthHeroInPx +
                this._attack.gapWithoutHeroInPx -
                this._attack.deltaLeftPositionInPx,
              animationDirection: EDirection.Right
            }
          : {
              left: this._positionInPx.left - this._attack.gapWithoutHeroInPx,
              animationDirection: EDirection.Left
            };

      const attackObject = {
        attackNodeElement: this._attack.fabricAttackNodeElement({ ...independentSettings, ...dependentSettings }),
        direction: attackDirection
      };

      this._attackObjects.push(attackObject);
    });
  }

  private readonly _name: string;
  private readonly _house: EHouse;
  private readonly _widthHeroInPx = 225;
  private readonly _attack: IAttack;
  private readonly _timeoutShieldInMs = 5000;
  private readonly _timeoutBlockShieldInMs = 10000;

  protected readonly _heightHeroInPx: number;
  protected readonly _stepSizeHeroInPx = 5;

  private _direction: string;
  private _positionInPx: IPosition;
  private _lives: number;
  private _score: number;
  private _attackObjects: IAttackObject[] = [];
  private _isActivatedShield: boolean;
  private _isBlockedShield: boolean;

  public get name(): string {
    return this._name;
  }

  public get house(): EHouse {
    return this._house;
  }

  public get direction(): string {
    return this._direction;
  }

  public get positionInPx(): IPosition {
    return this._positionInPx;
  }

  public get lives(): number {
    return this._lives;
  }

  public get score(): number {
    return this._score;
  }

  public get isActivatedShield(): boolean {
    return this._isActivatedShield;
  }

  public get isBlockedShield(): boolean {
    return this._isBlockedShield;
  }

  public get widthHeroInPx(): number {
    return this._widthHeroInPx;
  }

  public stepToLeft(): void {
    const newPositionLeft = this.positionInPx.left - this._stepSizeHeroInPx;

    if (newPositionLeft >= 0) {
      this._direction = EDirection.Left;
      this.positionInPx.left = newPositionLeft;
    }
  }

  public stepToRight(): void {
    const newPositionLeft = this.positionInPx.left + this._stepSizeHeroInPx;

    if (newPositionLeft + this._widthHeroInPx <= SIZE_FIELD_GAME_IN_PX.width) {
      this._direction = EDirection.Right;
      this.positionInPx.left = newPositionLeft;
    }
  }

  public initAttack(fabricAttackNodeElement: FabricAttackNodeElementType): void {
    this._attack.fabricAttackNodeElement = fabricAttackNodeElement;
  }

  public attack(): void {
    this._attack.attack$.next(this._direction);
  }

  public drawAttackNodeElements(): void {
    for (let i = 0; i < this._attackObjects.length; i++) {
      const { attackNodeElement, direction } = this._attackObjects[i];

      if (direction === EDirection.Right) {
        if (attackNodeElement.context.left < SIZE_FIELD_GAME_IN_PX.width)
          attackNodeElement.context.left += this._attack.stepSizeInPx;
        else {
          attackNodeElement.destroy();
          this._attackObjects.splice(i, 1);
          i -= 1;
        }
      } else {
        if (attackNodeElement.context.left + this._attack.widthInPx > 0) {
          attackNodeElement.context.left -= this._attack.stepSizeInPx;
        } else {
          attackNodeElement.destroy();
          this._attackObjects.splice(i, 1);
          i -= 1;
        }
      }
    }
  }

  public activateShield(): boolean {
    if (this._isActivatedShield || this._isBlockedShield) return false;

    this._isActivatedShield = true;

    timer(this._timeoutShieldInMs)
      .pipe(
        mergeMap(() => {
          this._isActivatedShield = false;
          this._isBlockedShield = true;
          return timer(this._timeoutBlockShieldInMs);
        })
      )
      .subscribe(() => (this._isBlockedShield = false));

    return true;
  }

  public deleteLife(): void {
    this._lives -= 1;
  }

  public increaseScore(value: number): void {
    this._score += value;
  }
}
