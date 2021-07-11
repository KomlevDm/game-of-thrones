import { Subject, timer } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { EDirection } from '../../../enums/EDirection';
import { EHouse } from '../../../enums/EHouse';
import { HeroComponent } from '../../../pages/game-page/hero/hero.component';
import { AudioService } from '../../../services/audio.service';
import { Level } from '../Level';
import { Attack, IAttack } from '../Attack';
import { IPersonageSettings, APersonage } from '../Personage';
import { GameService } from 'src/app/services/game.service';
import { SuperAttack } from '../SuperAttack';

export abstract class AHero extends APersonage<HeroComponent> {
  private static readonly ATTACK_DEBOUNCE_TIME_IN_MS = 80;
  private static readonly SHIELD_ACTIVATE_TIMEOUT_IN_MS = 5 * 1000;
  private static readonly SHIELD_AVAILABLE_TIMEOUT_IN_MS = 10 * 1000;
  private static readonly ATTACK_SPEED_TIMEOUT_IN_MS = 10 * 1000;
  private static readonly ATTACK_SPEED_DELTA_STEP_SIZE_IN_PX = 20;
  private static readonly SUPER_ATTACK_TIMEOUT_IN_MS = 5 * 1000;

  public readonly house: EHouse;

  private _level: Level;

  private _isShieldActivated: boolean;
  private _isShieldAvailable: boolean;

  private _isAttackSpeedActivated: boolean;

  private _isSuperAttackActivated: boolean;

  private attackPool: IAttack & {
    pool: (Attack | SuperAttack)[];
    readonly addAttack$: Subject<void>;
    readonly render: () => void;
  };

  public get level(): Level {
    return this._level;
  }

  public get isShieldActivated(): boolean {
    return this._isShieldActivated;
  }
  public get isShieldAvailable(): boolean {
    return this._isShieldAvailable;
  }

  public get isAttackSpeedActivated(): boolean {
    return this._isAttackSpeedActivated;
  }

  public get isSuperAttackActivated(): boolean {
    return this._isSuperAttackActivated;
  }

  constructor(settings: IHeroSettings) {
    super({
      ...settings,
      stepSizeInPx: settings.stepSizeInPx ?? 5,
      direction: settings.direction ?? EDirection.Right,
      lives: settings.lives ?? 5,
    });

    this.house = settings.house;
    this._level = new Level(settings.levelNumber);

    this._isShieldActivated = settings.isShieldActivated ?? false;
    this._isShieldAvailable = settings.isShieldAvailable ?? true;

    this._isAttackSpeedActivated = settings.isAttackSpeedActivated ?? false;

    this._isSuperAttackActivated = settings.isSuperAttackActivated ?? false;

    this.setAttackSettings(settings.attack);
  }

  public viewInit(): void {
    if (this.view) return;

    super.viewInit(HeroComponent);

    this.view.house = this.house;
    this.view.widthInPx = this.widthInPx;
  }

  public render(): void {
    this.attackPool.render();

    this.view.direction = this.direction;
    this.view.xPositionInPx = this.xPositionInPx;
    this.view.yPositionInPx = this.yPositionInPx;
    this.view.isShieldActivated = this.isShieldActivated;
    this.view.render();
  }

  public stepToLeft(): void {
    const x = this.xPositionInPx - this.stepSizeInPx;

    if (x >= 0) {
      this.direction = EDirection.Left;
      this.xPositionInPx = x;
    }
  }

  public stepToRight(): void {
    const x = this.xPositionInPx + this.stepSizeInPx;

    if (x + this.widthInPx <= GameService.SIZE_FIELD_GAME_IN_PX.WIDTH) {
      this.direction = EDirection.Right;
      this.xPositionInPx = x;
    }
  }

  public attack(): void {
    this.attackPool.addAttack$.next();
  }

  public activateShield(): void {
    if (!this._isShieldAvailable) return;

    AudioService.instance.shield.play();
    this._isShieldActivated = true;
    this._isShieldAvailable = false;

    timer(AHero.SHIELD_ACTIVATE_TIMEOUT_IN_MS)
      .pipe(
        switchMap(() => {
          this._isShieldActivated = false;

          return timer(AHero.SHIELD_AVAILABLE_TIMEOUT_IN_MS);
        })
      )
      .subscribe(() => (this._isShieldAvailable = true));
  }

  public activateAttackSpeed(): void {
    if (this._isAttackSpeedActivated) return;

    AudioService.instance.past.play();
    this._isAttackSpeedActivated = true;

    this.attackPool.stepSizeInPx += AHero.ATTACK_SPEED_DELTA_STEP_SIZE_IN_PX;

    timer(AHero.ATTACK_SPEED_TIMEOUT_IN_MS).subscribe(() => {
      this._isAttackSpeedActivated = false;
      this.attackPool.stepSizeInPx -= AHero.ATTACK_SPEED_DELTA_STEP_SIZE_IN_PX;
    });
  }

  public activateSuperAttack(): void {
    if (this._isSuperAttackActivated) return;

    AudioService.instance.thunder.play();
    this._isSuperAttackActivated = true;

    timer(AHero.SUPER_ATTACK_TIMEOUT_IN_MS).subscribe(() => (this._isSuperAttackActivated = false));
  }

  public deleteLife(amount = 1): void {
    AudioService.instance.death.play();
    super.deleteLife(amount);
  }

  private setAttackSettings(settings: IAttack): void {
    if (this.attackPool) return;

    settings = {
      ...settings,
      sizeInPx: settings.sizeInPx ?? 30,
      stepSizeInPx: settings.stepSizeInPx ?? 10,
      sound: AudioService.instance.heroAttack.restart.bind(AudioService.instance.heroAttack),
    };

    this.attackPool = {
      ...settings,
      addAttack$: new Subject<void>(),
      pool: [],
      render: () => {
        this.attackPool.pool = this.attackPool.pool.filter((attack) => {
          attack.render(this.attackPool.stepSizeInPx);
          return attack.isExists();
        });
      },
    };

    this.attackPool.addAttack$.pipe(debounceTime(AHero.ATTACK_DEBOUNCE_TIME_IN_MS)).subscribe(() => {
      const AttackConstructor = this._isSuperAttackActivated ? SuperAttack : Attack;

      this.attackPool.pool.push(
        new AttackConstructor({
          ...settings,
          xStartPositionInPx:
            this.direction === EDirection.Right
              ? this.xPositionInPx + this.widthInPx + settings.xStartPositionInPx
              : this.xPositionInPx - settings.xStartPositionInPx,
          yStartPositionInPx: this.yPositionInPx + settings.yStartPositionInPx,
          direction: this.direction,
        })
      );
    });
  }
}

export interface IHeroSettings extends IPersonageSettings {
  readonly levelNumber: number;
  readonly house: EHouse;

  readonly isShieldActivated: boolean;
  readonly isShieldAvailable: boolean;

  readonly isAttackSpeedActivated: boolean;

  readonly isSuperAttackActivated: boolean;

  readonly attack: IAttack;
}
