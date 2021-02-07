import { ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { SIZE_FIELD_GAME_IN_PX, DEBOUNCE_TIME_ATTACK_IN_MS } from '../../../constants/gameParams';
import { EDirection } from '../../../enums/EDirection';
import { EHouse } from '../../../enums/EHouse';
import { AttackComponent } from '../../../pages/game-page/attack/attack.component';
import { HeroComponent } from '../../../pages/game-page/hero/hero.component';
import { AudioService } from '../../../services/audio.service';
import { IPersonageSettings, Personage } from '../Personage';

export abstract class Hero extends Personage {
  constructor(settings: IHeroSettings) {
    super({
      ...settings,
      stepSizeInPx: settings.stepSizeInPx ?? 5,
      direction: settings.direction ?? EDirection.Right,
      lives: settings.lives ?? 5,
    });

    this.house = settings.house;
    this._isShieldActivated = settings.isShieldActivated ?? false;
    this._isShieldAvailable = settings.isShieldAvailable ?? true;
    this._isSpeedActivated = settings.isSpeedActivated ?? false;
    this._isSpeedAvailable = settings.isSpeedAvailable ?? true;
    this.speedSizeInPx = settings.speedSizeInPx ?? 1000;

    this.attackObj = {
      ...settings.attack,
      sizeInPx: settings.attack.sizeInPx ?? 30,
      stepSizeInPx: settings.attack.stepSizeInPx ?? 10,
      attack$: new Subject<EDirection>(),
      views: [],
    };
    this.attackObj.attack$.pipe(debounceTime(DEBOUNCE_TIME_ATTACK_IN_MS)).subscribe((direction) => {
      const attackObject = {
        attackComponentRef: this.createAttackComponent(direction),
        direction,
      };

      this.attackObj.sound();

      this.attackObj.views.push(attackObject);
    });
  }

  private readonly TIMEOUT_SHIELD_ACTIVATED_IN_MS = 5000;
  private readonly TIMEOUT_SHIELD_AVAILABLE_IN_MS = 10000;
  private readonly TIMEOUT_SPEED_ACTIVATED_IN_MS = 100;
  private readonly TIMEOUT_SPEED_AVAILABLE_IN_MS = 2000;

  private _isShieldActivated: boolean;
  private _isShieldAvailable: boolean;
  private _isSpeedActivated: boolean;
  private _isSpeedAvailable: boolean;
  private speedSizeInPx: number;
  private componentFactoryResolver: ComponentFactoryResolver;
  private gameField: ViewContainerRef;
  private heroComponent: HeroComponent;
  private attackObj: IHeroSettings['attack'] & {
    attack$: Subject<EDirection>;
    views: {
      attackComponentRef: ComponentRef<AttackComponent>;
      direction: EDirection;
    }[];
  };

  public readonly house: EHouse;

  public get isShieldActivated(): boolean {
    return this._isShieldActivated;
  }

  public get isShieldAvailable(): boolean {
    return this._isShieldAvailable;
  }

  public get isSpeedActivated(): boolean {
    return this._isSpeedActivated;
  }

  public get isSpeedAvailable(): boolean {
    return this._isSpeedAvailable;
  }

  public init(componentFactoryResolver: ComponentFactoryResolver, gameField: ViewContainerRef): void {
    this.componentFactoryResolver = componentFactoryResolver;
    this.gameField = gameField;

    this.initHeroComponent();
  }

  public stepToLeft(stepSize = this.stepSizeInPx): void {
    if (this._isSpeedActivated) return;

    const x = this.xPositionInPx - stepSize;

    if (x >= 0) {
      this.direction = EDirection.Left;
      this.xPositionInPx = x;
    }
  }

  public stepToRight(stepSize = this.stepSizeInPx): void {
    if (this._isSpeedActivated) return;

    const x = this.xPositionInPx + stepSize;

    if (x + this.widthInPx <= SIZE_FIELD_GAME_IN_PX.width) {
      this.direction = EDirection.Right;
      this.xPositionInPx = x;
    }
  }

  public deleteLife(amount = 1): void {
    super.deleteLife(amount);
    AudioService.instance.death.play();
  }

  public activateShield(): void {
    if (this._isShieldActivated || !this._isShieldAvailable) return;

    AudioService.instance.shield.restart();
    this._isShieldActivated = true;

    timer(this.TIMEOUT_SHIELD_ACTIVATED_IN_MS)
      .pipe(
        switchMap(() => {
          this._isShieldActivated = false;
          this._isShieldAvailable = false;
          return timer(this.TIMEOUT_SHIELD_AVAILABLE_IN_MS);
        })
      )
      .subscribe(() => (this._isShieldAvailable = true));
  }

  public speed(): void {
    if (this._isSpeedActivated || !this._isSpeedAvailable) return;

    //TODO
    // AudioService.instance.speed.restart();
    this._isSpeedActivated = true;

    switch (this.direction) {
      case EDirection.Left: {
        const x = this.xPositionInPx - this.speedSizeInPx;
        this.xPositionInPx = x < 0 ? 0 : x;

        break;
      }

      case EDirection.Right: {
        const x = this.xPositionInPx + this.speedSizeInPx;
        this.xPositionInPx =
          x > SIZE_FIELD_GAME_IN_PX.width - this.widthInPx ? SIZE_FIELD_GAME_IN_PX.width - this.widthInPx : x;

        break;
      }
    }

    this.heroComponent.speed();

    timer(this.TIMEOUT_SPEED_ACTIVATED_IN_MS)
      .pipe(
        switchMap(() => {
          this._isSpeedActivated = false;
          this._isSpeedAvailable = false;
          return timer(this.TIMEOUT_SPEED_AVAILABLE_IN_MS);
        })
      )
      .subscribe(() => (this._isSpeedAvailable = true));
  }

  public attack(): void {
    this.attackObj.attack$.next(this.direction);
  }

  public drawAttackNodeElements(): void {
    this.attackObj.views = this.attackObj.views.filter((view) => {
      const { attackComponentRef, direction } = view;

      if (direction === EDirection.Right && attackComponentRef.instance.xPositionInPx < SIZE_FIELD_GAME_IN_PX.width) {
        attackComponentRef.instance.xPositionInPx += this.attackObj.stepSizeInPx;
        return true;
      }

      if (direction === EDirection.Left && attackComponentRef.instance.xPositionInPx + this.attackObj.sizeInPx > 0) {
        attackComponentRef.instance.xPositionInPx -= this.attackObj.stepSizeInPx;
        return true;
      }

      attackComponentRef.destroy();
      return false;
    });
  }

  public render(): void {
    this.heroComponent.xPositionInPx = this.xPositionInPx;
    this.heroComponent.yPositionInPx = this.yPositionInPx;
    this.heroComponent.direction = this.direction;
    this.heroComponent.isShieldActivated = this.isShieldActivated;
    this.heroComponent.cdr.markForCheck();
  }

  private initHeroComponent(): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(HeroComponent);
    this.heroComponent = this.gameField.createComponent(factory).instance;
    this.heroComponent.heroHouse = this.house;
    this.heroComponent.widthInPx = this.widthInPx;
  }

  private createAttackComponent(direction: EDirection): ComponentRef<AttackComponent> {
    const factory = this.componentFactoryResolver.resolveComponentFactory(AttackComponent);
    const attackComponentRef = this.gameField.createComponent(factory);

    attackComponentRef.instance.name = this.attackObj.name;
    attackComponentRef.instance.direction = direction;
    attackComponentRef.instance.xPositionInPx =
      direction === EDirection.Right
        ? this.xPositionInPx + this.widthInPx + this.attackObj.xPositionInPx
        : this.xPositionInPx - this.attackObj.xPositionInPx;
    attackComponentRef.instance.yPositionInPx = this.yPositionInPx + this.attackObj.yPositionInPx;
    attackComponentRef.instance.sizeInPx = this.attackObj.sizeInPx;

    return attackComponentRef;
  }
}

export interface IHeroSettings extends IPersonageSettings {
  house: EHouse;
  isShieldActivated: boolean;
  isShieldAvailable: boolean;
  isSpeedActivated: boolean;
  isSpeedAvailable: boolean;
  speedSizeInPx: number;
  attack: {
    name: string;
    sizeInPx: number;
    xPositionInPx: number;
    yPositionInPx: number;
    stepSizeInPx: number;
    sound: () => void;
  };
}

export interface IAttackNodeElementSettings {
  name: string;
  leftInPx: number;
  topInPx: number;
  sizeInPx: number;
  animationDirection?: EDirection;
}
