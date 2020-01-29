import { DEBOUNCE_TIME_ATTACK_IN_MS } from '../../constants/gameSettings';
import { EmbeddedViewRef } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IPosition } from '../../interfaces/IPosition';
import { FabricAttackNodeElementType } from '../../types/FabricAttackNodeElementType';
import { IAttack } from '../../interfaces/IAttack';
import { ISettingsAttackNodeElement } from '../../interfaces/ISettingsAttackNodeElement';

interface ISize {
  width: number;
  height: number;
}

export interface IMonsterSettings {
  name: string;
  positionInPx?: IPosition;
  sizeInPx: ISize;
  stepSizeMonsterInPx?: number;
  lives: number;
  attack: {
    name: string;
    deltaTopPositionInPx: number;
    fabricAttackNodeElement: FabricAttackNodeElementType;
    gapWithoutAttackingInPx: number;
    sizeInPx?: number;
  };
}

export abstract class Monster {
  constructor({ name, positionInPx, sizeInPx, stepSizeMonsterInPx, lives, attack }: IMonsterSettings) {
    this._name = name;
    this._positionInPx = positionInPx;
    this._sizeInPx = sizeInPx;
    this._stepSizeMonsterInPx = stepSizeMonsterInPx || 3;
    this._lives = lives;

    this._attack = {
      ...attack,
      sizeInPx: attack.sizeInPx || 30,
      stepSizeInPx: 10,
      attack$: new Subject<void>()
    };
    this._attack.attack$.pipe(debounceTime(DEBOUNCE_TIME_ATTACK_IN_MS)).subscribe(() => {
      const settingsAttackNodeElement = {
        name: this._attack.name,
        leftInPx: this._positionInPx.left - this._attack.gapWithoutAttackingInPx,
        topInPx: this._positionInPx.top + this._attack.deltaTopPositionInPx,
        sizeInPx: this._attack.sizeInPx
      };

      this._attackNodeElements.push(this._attack.fabricAttackNodeElement(settingsAttackNodeElement));
    });
  }

  private readonly _name: string;
  private readonly _sizeInPx: ISize;
  private readonly _attack: IAttack<void>;

  protected readonly _stepSizeMonsterInPx: number;

  private _positionInPx: IPosition;
  private _attackNodeElements: EmbeddedViewRef<ISettingsAttackNodeElement>[] = [];
  private _lives: number;
  private _isDead = false;

  public get name(): string {
    return this._name;
  }

  public get stepSizeMonsterInPx(): number {
    return this._stepSizeMonsterInPx;
  }

  public get attackNodeElements(): EmbeddedViewRef<ISettingsAttackNodeElement>[] {
    return this._attackNodeElements;
  }

  public get positionInPx(): IPosition {
    return this._positionInPx;
  }

  public get sizeInPx(): ISize {
    return this._sizeInPx;
  }

  public get isDead(): boolean {
    return this._isDead;
  }

  public step(): void {
    const newPositionLeft = this.positionInPx.left - this._stepSizeMonsterInPx;

    if (newPositionLeft + this._sizeInPx.width >= 0) this.positionInPx.left = newPositionLeft;
    else this._isDead = true;
  }

  public attack(): void {
    this._attack.attack$.next();
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
    this._lives -= 1;
  }
}
