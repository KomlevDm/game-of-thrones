import {
  Component,
  OnInit,
  HostListener,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  EmbeddedViewRef
} from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { SoundsService } from 'src/app/services/sounds.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EGameDialogMode } from '../game-dialog/game-dialog.component';
import { ISettingsAttackNodeElement } from 'src/app/interfaces/ISettingsAttackNodeElement';
import { MonsterService } from 'src/app/services/monster.service';
import { FlyingPlayer } from 'src/app/classes/player/FlyingPlayer';
import { GoingPlayer } from 'src/app/classes/player/GoingPlayer';
import { Monster } from 'src/app/classes/monster/Monster';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  constructor(
    private _router: Router,
    private _soundsService: SoundsService,
    private _monsterService: MonsterService,
    public gameService: GameService
  ) {}

  private _isKeydownArrowUp = false;
  private _isKeydownArrowDown = false;
  private _isKeydownArrowLeft = false;
  private _isKeydownArrowRight = false;
  private _isKeydownSpace = false;
  private _isKeydownControlLeft = false;
  private _pauseGame = false;
  private _isGameOver = false;
  private _requestIdAnimationFrame: number;
  private _destroyedComponent$ = new Subject();

  public stateGameDialog$ = new BehaviorSubject(false);
  public gameDialogMode$ = new BehaviorSubject(EGameDialogMode.Game);

  @ViewChild('gameField', { static: false, read: ViewContainerRef }) gameField: ViewContainerRef;
  @ViewChild('attack', { static: false }) attackNodeElementTemplate: TemplateRef<ISettingsAttackNodeElement>;
  @ViewChild('monster', { static: false }) monsterNodeElementTemplate: TemplateRef<Monster>;

  ngOnInit() {
    if (this.gameService.player) {
      this.gameService.player.initFabricAttack(this._fabricAttackNodeElement.bind(this));

      this._monsterService.initFabricsMonster(
        this._fabricMonsterNodeElement.bind(this),
        this._fabricAttackNodeElement.bind(this)
      );
      this._monsterService.startGenerateMonsters();

      this.gameLoop();
    }

    this.stateGameDialog$.pipe(takeUntil(this._destroyedComponent$)).subscribe(dialogState => {
      this._pauseGame = dialogState;

      if (this._pauseGame) this._monsterService.pauseGenerateMonsters();
      else this._monsterService.startGenerateMonsters();
    });
  }

  ngOnDestroy() {
    this.gameService.cleanGameInfo();
    this._monsterService.cleanMonsterInfo();

    this._destroyedComponent$.next();
    this._destroyedComponent$.complete();

    cancelAnimationFrame(this._requestIdAnimationFrame);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowUp':
        this._isKeydownArrowUp = true;
        break;

      case 'ArrowDown':
        this._isKeydownArrowDown = true;
        break;

      case 'ArrowLeft':
        this._isKeydownArrowLeft = true;
        break;

      case 'ArrowRight':
        this._isKeydownArrowRight = true;
        break;

      case 'Space':
        this._isKeydownSpace = true;
        break;

      case 'ControlLeft':
        this._isKeydownControlLeft = true;
        break;

      case 'Escape':
        if (this.gameService.player && !this._isGameOver) this._toggleGameDialog();
        else {
          this._soundsService.dragonStompy.restart();
          this._router.navigateByUrl('/hero-selection');
        }

        break;
    }
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUpHandler(event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowUp':
        this._isKeydownArrowUp = false;
        break;

      case 'ArrowDown':
        this._isKeydownArrowDown = false;
        break;

      case 'ArrowLeft':
        this._isKeydownArrowLeft = false;
        break;

      case 'ArrowRight':
        this._isKeydownArrowRight = false;
        break;

      case 'Space':
        this._isKeydownSpace = false;
        break;

      case 'ControlLeft':
        this._isKeydownControlLeft = false;
        break;
    }
  }

  @HostListener('window:focus')
  onWindowFocusHandler() {
    this._toggleGameDialog();
  }

  @HostListener('window:blur')
  onWindowBlurHandler() {
    this._toggleGameDialog();
  }

  public gameLoop(): void {
    if (!this._pauseGame) {
      if (this._isKeydownArrowUp) {
        if (this.gameService.player instanceof FlyingPlayer) this.gameService.player.stepToUp();
        if (this.gameService.player instanceof GoingPlayer) this.gameService.player.jump();
      }

      if (this._isKeydownArrowDown && this.gameService.player instanceof FlyingPlayer) {
        this.gameService.player.stepToDown();
      }

      if (this._isKeydownArrowLeft) this.gameService.player.stepToLeft();

      if (this._isKeydownArrowRight) this.gameService.player.stepToRight();

      if (this._isKeydownSpace) this.gameService.player.attack();

      if (this._isKeydownControlLeft) this.gameService.player.activateShield();

      this.gameService.player.drawAttackNodeElements();
      this._monsterService.drawMonsters();

      this._calculateCollisions();
    }

    this._requestIdAnimationFrame = requestAnimationFrame(this.gameLoop.bind(this));
  }

  public getLivesAsArray(): void[] {
    return new Array(this.gameService.player.lives);
  }

  private _toggleGameDialog(): void {
    if (this.stateGameDialog$.value) {
      this._soundsService.past.restart();
      this.stateGameDialog$.next(false);
    } else {
      this.gameDialogMode$.next(EGameDialogMode.Game);
      this._soundsService.shortTomahawk.restart();
      this.stateGameDialog$.next(true);
    }
  }

  private _fabricAttackNodeElement(settings: ISettingsAttackNodeElement): EmbeddedViewRef<ISettingsAttackNodeElement> {
    const attackNodeElement = this.attackNodeElementTemplate.createEmbeddedView(settings);
    this.gameField.insert(attackNodeElement);

    return attackNodeElement;
  }

  private _fabricMonsterNodeElement(settings: Monster): EmbeddedViewRef<Monster> {
    const monsterNodeElement = this.monsterNodeElementTemplate.createEmbeddedView(settings);
    this.gameField.insert(monsterNodeElement);

    return monsterNodeElement;
  }

  private _calculateCollisions() {
    for (let i = 0; i < this.gameService.player.attackObjects.length; i++) {
      for (let j = 0; j < this._monsterService.monsterObjects.length; j++) {
        const attackContext = this.gameService.player.attackObjects[i].attackNodeElement.context;
        const monsterContext = this._monsterService.monsterObjects[j].monsterNodeElement.context;

        if (
          attackContext.topInPx + attackContext.sizeInPx / 2 > monsterContext.positionInPx.top &&
          attackContext.topInPx + attackContext.sizeInPx / 2 <
            monsterContext.positionInPx.top + monsterContext.sizeInPx.height &&
          attackContext.leftInPx + attackContext.sizeInPx / 2 > monsterContext.positionInPx.left &&
          attackContext.leftInPx + attackContext.sizeInPx / 2 <
            monsterContext.positionInPx.left + monsterContext.sizeInPx.width
        ) {
          this.gameService.player.attackObjects[i].attackNodeElement.destroy();
          this.gameService.player.attackObjects.splice(i, 1);
          i -= 1;

          this._monsterService.monsterObjects[j].monster.deleteLife();
          if (this._monsterService.monsterObjects[j].monster.isDead) {
            this._monsterService.monsterObjects[j].subAttack.unsubscribe();
            this._monsterService.monsterObjects[j].monster.attackNodeElements.forEach(a => a.destroy());
            this._monsterService.monsterObjects[j].monsterNodeElement.destroy();
            this._monsterService.monsterObjects.splice(j, 1);
            j -= 1;
          }

          break;
        }
      }
    }
  }
}
