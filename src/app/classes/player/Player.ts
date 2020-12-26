import { EHouse } from '../../enums/EHouse';
import { EDirection } from '../../enums/EDirection';
import { SIZE_FIELD_GAME_IN_PX, DEBOUNCE_TIME_ATTACK_IN_MS } from '../../constants/gameSettings';
import { EmbeddedViewRef } from '@angular/core';
import { debounceTime, mergeMap } from 'rxjs/operators';
import { Subject, timer } from 'rxjs';
import { IPosition } from '../../interfaces/IPosition';
import { FabricAttackNodeElementType } from '../../types/FabricAttackNodeElementType';
import { IAttackNodeElementSettings } from '../../interfaces/IAttackNodeElementSettings';
import { IAttack } from '../../interfaces/IAttack';
import { ISize } from 'src/app/interfaces/ISize';
import { AudioService } from 'src/app/services/audio.service';

interface IShield {
  isActivatedShield: boolean;
  isBlockedShield: boolean;
}

interface IAttackObject {
  attackNodeElement: EmbeddedViewRef<IAttackNodeElementSettings>;
  direction: string;
}

export interface IPlayerSettings {
  name: string;
  house?: EHouse;
  direction?: EDirection;
  positionInPx?: IPosition;
  sizeInPx?: ISize;
  lives?: number;
  score?: number;
  shield?: IShield;
  attack?: {
    name: string;
    deltaPositionInPx: IPosition;
    sound: () => void;
  };
}

export abstract class Player {
  static defaultName = 'Player';

  constructor({ name, house, direction, positionInPx, sizeInPx, lives, score, shield, attack }: IPlayerSettings) {
    this._name = name || Player.defaultName;
    this._house = house;
    this._direction = direction || EDirection.Right;
    this._positionInPx = positionInPx;
    this._sizeInPx = sizeInPx;
    this._lives = lives || 5;
    this._score = score || 0;

    this._shield = {
      isActivatedShield: shield && shield.isActivatedShield,
      isBlockedShield: shield && shield.isBlockedShield,
    };

    this._attack = {
      name: attack.name,
      sizeInPx: 30,
      deltaPositionInPx: attack.deltaPositionInPx,
      stepSizeInPx: 10,
      fabricAttackNodeElement: null,
      sound: attack.sound,
      attack$: new Subject<EDirection>(),
    };
    this._attack.attack$.pipe(debounceTime(DEBOUNCE_TIME_ATTACK_IN_MS)).subscribe((attackDirection) => {
      const attackNodeElementSettings: IAttackNodeElementSettings = {
        name: this._attack.name,
        leftInPx:
          attackDirection === EDirection.Right
            ? this._positionInPx.left + this._sizeInPx.width + this._attack.deltaPositionInPx.left
            : this._positionInPx.left - this._attack.deltaPositionInPx.left,
        topInPx: this._positionInPx.top + this._attack.deltaPositionInPx.top,
        sizeInPx: this._attack.sizeInPx,
        animationDirection: attackDirection,
      };

      const attackObject: IAttackObject = {
        attackNodeElement: this._attack.fabricAttackNodeElement(attackNodeElementSettings),
        direction: attackDirection,
      };

      this._attack.sound();

      this._attackObjects.push(attackObject);
    });
  }

  private readonly _name: string;
  private readonly _house: EHouse;
  private readonly _positionInPx: IPosition;
  private readonly _sizeInPx: ISize;
  private readonly _shield: IShield;
  private readonly _attack: IAttack;
  private readonly _attackObjects: IAttackObject[] = [];
  private readonly _timeoutsShieldInMs = {
    action: 5000,
    block: 10000,
  };

  protected readonly _stepSizeInPx = 5;

  private _direction: EDirection;
  private _lives: number;
  private _score: number;
  private _isDead = false;

  public get name(): string {
    return this._name;
  }

  public get house(): EHouse {
    return this._house;
  }

  public get positionInPx(): IPosition {
    return this._positionInPx;
  }

  public get sizeInPx(): ISize {
    return this._sizeInPx;
  }

  public get isActivatedShield(): boolean {
    return this._shield.isActivatedShield;
  }

  public get isBlockedShield(): boolean {
    return this._shield.isBlockedShield;
  }

  public get attackObjects(): IAttackObject[] {
    return this._attackObjects;
  }

  public get fabricAttackNodeElement(): FabricAttackNodeElementType {
    return this._attack.fabricAttackNodeElement;
  }

  public get direction(): EDirection {
    return this._direction;
  }

  public get lives(): number {
    return this._lives;
  }

  public get score(): number {
    return this._score;
  }

  public get isDead(): boolean {
    return this._isDead;
  }

  public stepToLeft(stepSize = this._stepSizeInPx): void {
    const newPositionLeft = this.positionInPx.left - stepSize;

    if (newPositionLeft >= 0) {
      this._direction = EDirection.Left;
      this.positionInPx.left = newPositionLeft;
    }
  }

  public stepToRight(stepSize = this._stepSizeInPx): void {
    const newPositionLeft = this.positionInPx.left + stepSize;

    if (newPositionLeft + this._sizeInPx.width <= SIZE_FIELD_GAME_IN_PX.width) {
      this._direction = EDirection.Right;
      this.positionInPx.left = newPositionLeft;
    }
  }

  public initFabricAttack(fabricAttackNodeElement: FabricAttackNodeElementType): void {
    this._attack.fabricAttackNodeElement = fabricAttackNodeElement;
  }

  public attack(): void {
    this._attack.attack$.next(this._direction);
  }

  public drawAttackNodeElements(): void {
    for (let i = 0; i < this._attackObjects.length; i++) {
      const { attackNodeElement, direction } = this._attackObjects[i];

      if (direction === EDirection.Right) {
        if (attackNodeElement.context.leftInPx < SIZE_FIELD_GAME_IN_PX.width)
          attackNodeElement.context.leftInPx += this._attack.stepSizeInPx;
        else {
          attackNodeElement.destroy();
          this._attackObjects.splice(i, 1);
          i -= 1;
        }
      } else {
        if (attackNodeElement.context.leftInPx + this._attack.sizeInPx > 0) {
          attackNodeElement.context.leftInPx -= this._attack.stepSizeInPx;
        } else {
          attackNodeElement.destroy();
          this._attackObjects.splice(i, 1);
          i -= 1;
        }
      }
    }
  }

  public activateShield(): void {
    if (this._shield.isActivatedShield || this._shield.isBlockedShield) return;

    AudioService.instance.shield.restart();

    this._shield.isActivatedShield = true;

    timer(this._timeoutsShieldInMs.action)
      .pipe(
        mergeMap(() => {
          this._shield.isActivatedShield = false;
          this._shield.isBlockedShield = true;
          return timer(this._timeoutsShieldInMs.block);
        })
      )
      .subscribe(() => (this._shield.isBlockedShield = false));
  }

  public deleteLife(): void {
    if (this._isDead) return;

    this._lives -= 1;
    AudioService.instance.death.play();

    if (this._lives === 0) this._isDead = true;
  }

  public increaseScore(value: number): void {
    this._score += value;
  }
}
