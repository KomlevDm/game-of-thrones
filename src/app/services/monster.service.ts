import { Injectable, EmbeddedViewRef } from '@angular/core';
import { Monster } from '../classes/monster/Monster';
import { FabricMonsterNodeElementType } from '../types/FabricMonsterNodeElementType';
import { FabricAttackNodeElementType } from '../types/FabricAttackNodeElementType';
import { interval, Subscription, timer } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Gin } from '../classes/monster/Gin';
import { FlyIceDragon } from '../classes/monster/FlyIceDragon';
import { IceDragon } from '../classes/monster/IceDragon';
import { DeathAngel } from '../classes/monster/DeathAngel';
import { FlyingMonster } from '../classes/monster/FlyingMonster';
import { getRandomNumber } from '../helpers/getRandomNumber';
import { SIZE_FIELD_GAME_IN_PX } from '../constants/gameParams';

enum EVerticalDirection {
  Up,
  Down
}

interface IMonsterObject {
  monster: Monster;
  monsterNodeElement: EmbeddedViewRef<Monster>;
  subAttack: Subscription;
  verticalDirection?: EVerticalDirection;
}

@Injectable({ providedIn: 'root' })
export class MonsterService {
  constructor() {}

  private readonly _periodGenerateMonstersInMs = 4000;
  private readonly _periodAttackMonstersInMs = 2000;

  private _monsterObjects: IMonsterObject[] = [];
  private _fabricMonsterNodeElement: FabricMonsterNodeElementType = null;
  private _fabricAttackNodeElement: FabricAttackNodeElementType = null;
  private _togglerGenerationMonsters = false;
  private _subGenerationMonsters: Subscription = null;

  public get monsterObjects(): IMonsterObject[] {
    return this._monsterObjects;
  }

  public initFabricsMonster(
    fabricMonsterNodeElement: FabricMonsterNodeElementType,
    fabricAttackNodeElement: FabricAttackNodeElementType
  ): void {
    this._fabricMonsterNodeElement = fabricMonsterNodeElement;
    this._fabricAttackNodeElement = fabricAttackNodeElement;
  }

  public startGenerateMonsters(): void {
    if (!this._fabricMonsterNodeElement) return;

    this._togglerGenerationMonsters = true;

    if (!this._subGenerationMonsters) {
      this._subGenerationMonsters = timer(0, this._periodGenerateMonstersInMs)
        .pipe(filter(() => this._togglerGenerationMonsters))
        .subscribe(() => {
          const monster = this._creteRandomMonster();
          const monsterNodeElement = this._fabricMonsterNodeElement(monster);
          const subAttack = interval(this._periodAttackMonstersInMs)
            .pipe(filter(() => this._togglerGenerationMonsters))
            .subscribe(() => monster.attack());

          const monsterObject =
            monster instanceof FlyingMonster
              ? { monster, monsterNodeElement, subAttack, verticalDirection: this._getRandomVerticalDirection() }
              : { monster, monsterNodeElement, subAttack };

          this._monsterObjects.push(monsterObject);
        });
    }
  }

  public drawMonsters(): void {
    for (let i = 0; i < this._monsterObjects.length; i++) {
      const monsterObject = this._monsterObjects[i];

      monsterObject.monster.step();
      if (monsterObject.monster instanceof FlyingMonster) this._randomVerticalStep(monsterObject);
      monsterObject.monster.drawAttackNodeElements();

      if (monsterObject.monster.isDead) {
        monsterObject.subAttack.unsubscribe();
        monsterObject.monster.attackNodeElements.forEach(a => a.destroy());
        monsterObject.monsterNodeElement.destroy();
        this._monsterObjects.splice(i, 1);
        i -= 1;
      }
    }
  }

  public pauseGenerateMonsters(): void {
    this._togglerGenerationMonsters = false;
  }

  public restartGenerateMonster(): void {
    this._monsterObjects.forEach(m => {
      m.subAttack.unsubscribe();
      m.monster.attackNodeElements.forEach(a => a.destroy());
      m.monsterNodeElement.destroy();
    });
    this._monsterObjects = [];
    this._togglerGenerationMonsters = true;
  }

  public cleanMonsterInfo(): void {
    this._monsterObjects.forEach(m => m.subAttack.unsubscribe());
    this._monsterObjects = [];
    this._fabricMonsterNodeElement = null;
    this._fabricAttackNodeElement = null;
    this._togglerGenerationMonsters = false;

    if (this._subGenerationMonsters) {
      this._subGenerationMonsters.unsubscribe();
      this._subGenerationMonsters = null;
    }
  }

  private _creteRandomMonster(): Monster {
    const monsters = [Gin, FlyIceDragon, IceDragon, DeathAngel];
    const monsterIndex = Math.floor(Math.random() * monsters.length);

    const newMonster = new monsters[monsterIndex]();
    newMonster.initFabricAttack(this._fabricAttackNodeElement);

    return newMonster;
  }

  private _randomVerticalStep(monsterObject: IMonsterObject): void {
    if (
      monsterObject.verticalDirection === EVerticalDirection.Up &&
      monsterObject.monster.positionInPx.top <= monsterObject.monster.stepSizeInPx
    ) {
      (monsterObject.monster as FlyingMonster).stepToDown();
      monsterObject.verticalDirection = Number(!monsterObject.verticalDirection);
    } else if (
      monsterObject.verticalDirection === EVerticalDirection.Down &&
      monsterObject.monster.positionInPx.top >=
        SIZE_FIELD_GAME_IN_PX.height - monsterObject.monster.sizeInPx.height - monsterObject.monster.stepSizeInPx
    ) {
      (monsterObject.monster as FlyingMonster).stepToUp();
      monsterObject.verticalDirection = Number(!monsterObject.verticalDirection);
    } else if (monsterObject.verticalDirection === EVerticalDirection.Up) {
      (monsterObject.monster as FlyingMonster).stepToUp();
    } else if (monsterObject.verticalDirection === EVerticalDirection.Down) {
      (monsterObject.monster as FlyingMonster).stepToDown();
    }
  }

  private _getRandomVerticalDirection(): EVerticalDirection {
    return getRandomNumber(EVerticalDirection.Up, EVerticalDirection.Down);
  }
}
