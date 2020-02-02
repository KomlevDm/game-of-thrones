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
import { IAttackNodeElementSettings } from 'src/app/interfaces/IAttackNodeElementSettings';
import { MonsterService } from 'src/app/services/monster.service';
import { FlyingPlayer } from 'src/app/classes/player/FlyingPlayer';
import { GoingPlayer } from 'src/app/classes/player/GoingPlayer';
import { Monster } from 'src/app/classes/monster/Monster';
import { ITableItem } from '../top-table/top-table.component';
import { EKeyLocalStorage } from 'src/app/enums/EKeyLocalStorage';

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
  private _pauseGameToggler = false;
  private _isGameOver = false;
  private _requestIdAnimationFrame: number;
  private _destroyedComponent$ = new Subject();

  public stateGameDialog$ = new BehaviorSubject(false);
  public gameDialogMode$ = new BehaviorSubject(EGameDialogMode.Game);

  @ViewChild('gameField', { static: false, read: ViewContainerRef }) gameField: ViewContainerRef;
  @ViewChild('attack', { static: false }) attackNodeElementTemplate: TemplateRef<IAttackNodeElementSettings>;
  @ViewChild('monster', { static: false }) monsterNodeElementTemplate: TemplateRef<Monster>;

  ngOnInit() {
    if (!this.gameService.player) return;

    this.stateGameDialog$.pipe(takeUntil(this._destroyedComponent$)).subscribe(dialogState => {
      if (dialogState) this._pauseGame();
      else this._continueGame();
    });

    this.gameService.player.initFabricAttack(this._fabricAttackNodeElement.bind(this));

    this._monsterService.initFabricsMonster(
      this._fabricMonsterNodeElement.bind(this),
      this._fabricAttackNodeElement.bind(this)
    );
    this._monsterService.startGenerateMonsters();

    this._gameLoop();
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
        if (this._isGameOver) break;

        if (this.gameService.player) this._toggleGameDialog();
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
    if (this.gameService.player && !this._isGameOver && !this.stateGameDialog$.value) this._continueGame();
  }

  @HostListener('window:blur')
  onWindowBlurHandler() {
    if (this.gameService.player) this._pauseGame();
  }

  public getLivesAsArray(): void[] {
    return new Array(this.gameService.player.lives);
  }

  private _gameLoop(): void {
    if (!this._pauseGameToggler) {
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

    this._requestIdAnimationFrame = requestAnimationFrame(this._gameLoop.bind(this));
  }

  private _gameOver(): void {
    this._soundsService.gameOver.restart();
    this._isGameOver = true;
    this._toggleGameDialog();
    this.gameDialogMode$.next(EGameDialogMode.GameOver);
    this._saveResultGameInTopTable();
    this._pauseGame();
  }

  private _saveResultGameInTopTable(): void {
    const currentTopTableData: ITableItem = {
      name: this.gameService.player.name,
      score: this.gameService.player.score,
      date: new Date()
    };

    const topTableDataFromLocalStorage: ITableItem[] = JSON.parse(localStorage.getItem(EKeyLocalStorage.TopTableData));

    if (topTableDataFromLocalStorage === null) {
      localStorage.setItem(EKeyLocalStorage.TopTableData, JSON.stringify([currentTopTableData]));
    } else {
      topTableDataFromLocalStorage.push(currentTopTableData);
      localStorage.setItem(EKeyLocalStorage.TopTableData, JSON.stringify(topTableDataFromLocalStorage));
    }
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

  private _pauseGame(): void {
    this._pauseGameToggler = true;
    this._monsterService.pauseGenerateMonsters();
  }

  private _continueGame(): void {
    this._pauseGameToggler = false;
    this._monsterService.startGenerateMonsters();
  }

  private _fabricAttackNodeElement(settings: IAttackNodeElementSettings): EmbeddedViewRef<IAttackNodeElementSettings> {
    const attackNodeElement = this.attackNodeElementTemplate.createEmbeddedView(settings);
    this.gameField.insert(attackNodeElement);

    return attackNodeElement;
  }

  private _fabricMonsterNodeElement(settings: Monster): EmbeddedViewRef<Monster> {
    const monsterNodeElement = this.monsterNodeElementTemplate.createEmbeddedView(settings);
    this.gameField.insert(monsterNodeElement);

    return monsterNodeElement;
  }

  private _calculateCollisions(): void {
    this._collisionsPlayerAttacksWithMonsters();

    this._collisionsMonstersAttacksWithPlayer();
  }

  private _collisionsPlayerAttacksWithMonsters(): void {
    const player = this.gameService.player;

    for (let i = 0; i < player.attackObjects.length; i++) {
      for (let j = 0; j < this._monsterService.monsterObjects.length; j++) {
        const attack = player.attackObjects[i].attackNodeElement.context;
        const monster = this._monsterService.monsterObjects[j].monster;

        if (
          attack.topInPx + attack.sizeInPx / 2 > monster.positionInPx.top &&
          attack.topInPx + attack.sizeInPx / 2 < monster.positionInPx.top + monster.sizeInPx.height &&
          attack.leftInPx + attack.sizeInPx / 2 > monster.positionInPx.left + monster.sizeInPx.width / 3 &&
          attack.leftInPx + attack.sizeInPx / 2 < monster.positionInPx.left + (monster.sizeInPx.width * 2) / 3
        ) {
          player.attackObjects[i].attackNodeElement.destroy();
          player.attackObjects.splice(i, 1);
          i -= 1;

          monster.deleteLife();

          if (monster.isDead) {
            player.increaseScore(monster.cost);
            this._soundsService.coinsRinging.restart();

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

  private _collisionsMonstersAttacksWithPlayer(): void {
    const player = this.gameService.player;

    for (let i = 0; i < this._monsterService.monsterObjects.length; i++) {
      const monster = this._monsterService.monsterObjects[i].monster;

      if (
        player.positionInPx.top + player.sizeInPx.height / 2 > monster.positionInPx.top + monster.sizeInPx.height / 4 &&
        player.positionInPx.top + player.sizeInPx.height / 2 <
          monster.positionInPx.top + (monster.sizeInPx.height * 3) / 4 &&
        player.positionInPx.left + player.sizeInPx.width / 2 > monster.positionInPx.left + monster.sizeInPx.width / 4 &&
        player.positionInPx.left + player.sizeInPx.width / 2 <
          monster.positionInPx.left + (monster.sizeInPx.width * 3) / 4
      ) {
        this._monsterService.monsterObjects[i].subAttack.unsubscribe();
        monster.attackNodeElements.forEach(a => a.destroy());
        this._monsterService.monsterObjects[i].monsterNodeElement.destroy();
        this._monsterService.monsterObjects.splice(i, 1);
        i -= 1;

        if (!player.isActivatedShield) player.deleteLife();
        if (player.isDead) this._gameOver();
      }

      for (let j = 0; j < monster.attackNodeElements.length; j++) {
        const attack = monster.attackNodeElements[j].context;

        if (
          attack.topInPx + attack.sizeInPx / 2 > player.positionInPx.top &&
          attack.topInPx + attack.sizeInPx / 2 < player.positionInPx.top + player.sizeInPx.height &&
          attack.leftInPx + attack.sizeInPx / 2 > player.positionInPx.left + player.sizeInPx.width / 3 &&
          attack.leftInPx + attack.sizeInPx / 2 < player.positionInPx.left + (player.sizeInPx.width * 2) / 3
        ) {
          monster.attackNodeElements[j].destroy();
          monster.attackNodeElements.splice(j, 1);
          j -= 1;

          if (!player.isActivatedShield) player.deleteLife();
          if (player.isDead) this._gameOver();
        }
      }
    }
  }
}
