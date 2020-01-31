import { EmbeddedViewRef } from '@angular/core';
import { IPosition } from '../../interfaces/IPosition';
import { FabricAttackNodeElementType } from '../../types/FabricAttackNodeElementType';
import { IAttack } from '../../interfaces/IAttack';
import { IAttackNodeElementSettings } from '../../interfaces/IAttackNodeElementSettings';
import { ISize } from 'src/app/interfaces/ISize';

export interface IMonsterSettings {
  name: string;
  positionInPx?: IPosition;
  sizeInPx: ISize;
  stepSizeInPx?: number;
  lives: number;
  cost: number;
  attack: {
    name: string;
    sizeInPx?: number;
    deltaPositionInPx: IPosition;
  };
}

export abstract class Monster {
  constructor({ name, positionInPx, sizeInPx, stepSizeInPx, lives, cost, attack }: IMonsterSettings) {
    this._name = name;
    this._positionInPx = positionInPx;
    this._sizeInPx = sizeInPx;
    this._stepSizeInPx = stepSizeInPx || 3;
    this._lives = lives;
    this._cost = cost;
    this._attack = {
      name: attack.name,
      sizeInPx: attack.sizeInPx || 30,
      deltaPositionInPx: attack.deltaPositionInPx,
      stepSizeInPx: 10,
      fabricAttackNodeElement: null
    };
  }

  private readonly _name: string;
  private readonly _positionInPx: IPosition;
  private readonly _sizeInPx: ISize;
  private readonly _stepSizeInPx: number;
  private readonly _cost: number;
  private readonly _attack: IAttack;
  private readonly _attackNodeElements: EmbeddedViewRef<IAttackNodeElementSettings>[] = [];

  private _lives: number;
  private _isDead = false;

  public get name(): string {
    return this._name;
  }

  public get positionInPx(): IPosition {
    return this._positionInPx;
  }

  public get stepSizeInPx(): number {
    return this._stepSizeInPx;
  }

  public get sizeInPx(): ISize {
    return this._sizeInPx;
  }

  public get cost(): number {
    return this._cost;
  }

  public get attackNodeElements(): EmbeddedViewRef<IAttackNodeElementSettings>[] {
    return this._attackNodeElements;
  }

  public get isDead(): boolean {
    return this._isDead;
  }

  public step(): void {
    const newPositionLeft = this.positionInPx.left - this._stepSizeInPx;

    if (newPositionLeft + this._sizeInPx.width >= 0) this.positionInPx.left = newPositionLeft;
    else this._isDead = true;
  }

  public initFabricAttack(fabricAttackNodeElement: FabricAttackNodeElementType): void {
    this._attack.fabricAttackNodeElement = fabricAttackNodeElement;
  }

  public attack(): void {
    const attackNodeElementSettings = {
      name: this._attack.name,
      leftInPx: this._positionInPx.left - this._attack.deltaPositionInPx.left,
      topInPx: this._positionInPx.top + this._attack.deltaPositionInPx.top,
      sizeInPx: this._attack.sizeInPx
    };

    this._attackNodeElements.push(this._attack.fabricAttackNodeElement(attackNodeElementSettings));
  }

  public drawAttackNodeElements(): void {
    for (let i = 0; i < this._attackNodeElements.length; i++) {
      if (this._attackNodeElements[i].context.leftInPx + this._attack.sizeInPx > 0) {
        this._attackNodeElements[i].context.leftInPx -= this._attack.stepSizeInPx;
      } else {
        this._attackNodeElements[i].destroy();
        this._attackNodeElements.splice(i, 1);
        i -= 1;
      }
    }
  }

  public deleteLife(): void {
    if (this._isDead) return;

    this._lives -= 1;

    if (this._lives === 0) this._isDead = true;
  }
}
