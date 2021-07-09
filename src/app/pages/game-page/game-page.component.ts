import {
  Component,
  OnInit,
  HostListener,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  EmbeddedViewRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  ComponentFactoryResolver,
  ApplicationRef,
  NgZone,
} from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { AudioService } from 'src/app/services/audio.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAttackNodeElementSettings } from 'src/app/interfaces/IAttackNodeElementSettings';
import { MonsterService } from 'src/app/services/monster.service';
import { FlyingPlayer } from 'src/app/classes/player/FlyingPlayer';
import { GoingPlayer } from 'src/app/classes/player/GoingPlayer';
import { Monster } from 'src/app/classes/monster/Monster';
import { ELocalStorageKey } from 'src/app/enums/ELocalStorageKey';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { EDirection } from '../../enums/EDirection';
import { IWorkerResponse } from '../../interfaces/IWorkerResponse';
import { IWorkerData } from '../../interfaces/IWorkerData';
import { ITableItem } from '../top-table-page/interfaces/ITableItem';
import { AppStateService } from '../../services/app-state.service';
import { EHouse } from '../../enums/EHouse';
import { HeroService } from '../../services/hero.service';
import { Hero } from 'src/app/classes/game/hero/Hero';
// import { EGameDialogMode } from '../../components/game-dialog/game-dialog.component';

@Component({
  selector: 'game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePageComponent implements OnInit, AfterViewInit, OnDestroy {
  public hero: Hero;

  constructor(
    private heroService: HeroService,
    private _router: Router,
    private audioService: AudioService,
    private _monsterService: MonsterService,
    private _domSanitizer: DomSanitizer,
    public gameService: GameService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private ngZone: NgZone,
    appStateService: AppStateService
  ) {
    appStateService.activateGame();
    gameService.playGame('test', EHouse.Lannister);

    this.hero = this.heroService.hero;
  }

  private destroyer$ = new Subject<void>();
  private isKeydownArrowUp = false;
  private isKeydownArrowDown = false;
  private isKeydownArrowLeft = false;
  private isKeydownArrowRight = false;
  private isKeydownSpace = false;
  private isKeydownControlLeft = false;
  private isKeydownShiftLeft = false;
  private _pauseGameToggler = false;
  private requestIdAnimationFrameId: number;
  private _worker = new Worker(new URL('../../app.worker.ts', import.meta.url), { type: 'module' });

  public stateGameDialog$ = new BehaviorSubject(false);
  // public gameDialogMode$ = new BehaviorSubject(EGameDialogMode.Game);

  @ViewChild('gameFieldTemplate', { read: ViewContainerRef })
  public gameField: ViewContainerRef;

  @ViewChild('monsterTemplate') monsterNodeElementTemplate: TemplateRef<Monster>;

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      addEventListener('keydown', this.keydownHandler);
      addEventListener('keyup', this.keyupHandler);
    });

    // this.stateGameDialog$.pipe(takeUntil(this.destroyer$)).subscribe((dialogState) => {
    //   if (dialogState) this._pauseGame();
    //   else this._continueGame();
    // });
    // this.gameService.player.initFabricAttack(this._fabricAttackNodeElement.bind(this));
    // this._monsterService.initFabricsMonster(
    //   this._fabricMonsterNodeElement.bind(this),
    //   this._fabricAttackNodeElement.bind(this)
    // );
    // this._monsterService.startGenerateMonsters();
    // this._worker.onmessage = ({ data }: { data: IWorkerResponse }) => {
    //   const player = this.gameService.player;
    //   const monsterObjects = this._monsterService.monsterObjects;
    //   const { playerLostLives, playerAttacksIndexes, monstersIndexes, monstersAttacksIndexes } = data;
    //   for (let i = 0; i < playerLostLives; i++) {
    //     if (!player.isActivatedShield) player.deleteLife();
    //     if (player.isDead) this._gameOver();
    //   }
    //   for (let i = 0; i < playerAttacksIndexes.length; i++) {
    //     player.attackObjects[playerAttacksIndexes[i] - i].attackNodeElement.destroy();
    //     player.attackObjects.splice(playerAttacksIndexes[i] - i, 1);
    //   }
    //   monstersIndexes.forEach((mi) => monsterObjects[mi].monster.deleteLife());
    //   monstersAttacksIndexes.forEach((mai) => {
    //     if (!monsterObjects[mai.monsterIndex].monster.isDead) {
    //       monsterObjects[mai.monsterIndex].monster.attackNodeElements[mai.attackIndex].destroy();
    //     }
    //   });
    //   monstersAttacksIndexes.forEach((mai) => {
    //     if (!monsterObjects[mai.monsterIndex].monster.isDead) {
    //       monsterObjects[mai.monsterIndex].monster.attackNodeElements = monsterObjects[
    //         mai.monsterIndex
    //       ].monster.attackNodeElements.filter((ane) => !ane.destroyed);
    //     }
    //   });
    //   for (let i = 0; i < monsterObjects.length; i++) {
    //     const monsterObject = monsterObjects[i];
    //     if (monsterObject.monster.isDead) {
    //       player.increaseScore(monsterObject.monster.cost);
    //       this.audioService.coinsRinging.restart();
    //       monsterObject.subAttack.unsubscribe();
    //       monsterObject.monster.attackNodeElements.forEach((ane) => ane.destroy());
    //       monsterObject.monsterNodeElement.destroy();
    //       monsterObjects.splice(i, 1);
    //     }
    //   }
    // };
  }

  ngAfterViewInit(): void {
    this.heroService.hero.init(this.componentFactoryResolver, this.gameField);

    this.gameLoop();
  }

  ngOnDestroy(): void {
    removeEventListener('keydown', this.keydownHandler);
    removeEventListener('keyup', this.keyupHandler);

    // this.gameService.cleanGameInfo();
    // this._monsterService.cleanMonsterInfo();

    this.destroyer$.next();
    this.destroyer$.complete();

    cancelAnimationFrame(this.requestIdAnimationFrameId);
  }

  private keydownHandler = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'ArrowUp':
        this.isKeydownArrowUp = true;
        break;

      case 'ArrowDown':
        this.isKeydownArrowDown = true;
        break;

      case 'ArrowLeft':
        this.isKeydownArrowLeft = true;
        break;

      case 'ArrowRight':
        this.isKeydownArrowRight = true;
        break;

      case 'Space':
        this.isKeydownSpace = true;
        break;

      case 'ControlLeft':
        this.isKeydownControlLeft = true;
        break;

      case 'ShiftLeft':
        this.isKeydownShiftLeft = true;
        break;

      // case 'Escape':
      //   if (this.gameService.player) {
      //     if (this.gameService.player.isDead) return;

      //     this._toggleGameDialog();
      //   } else {
      //     this.audioService.dragonStompy.restart();
      //     this._router.navigateByUrl('/hero-selection');
      //   }

      //   break;
    }
  };

  private keyupHandler = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'ArrowUp':
        this.isKeydownArrowUp = false;
        break;

      case 'ArrowDown':
        this.isKeydownArrowDown = false;
        break;

      case 'ArrowLeft':
        this.isKeydownArrowLeft = false;
        break;

      case 'ArrowRight':
        this.isKeydownArrowRight = false;
        break;

      case 'Space':
        this.isKeydownSpace = false;
        break;

      case 'ControlLeft':
        this.isKeydownControlLeft = false;
        break;

      case 'ShiftLeft':
        this.isKeydownShiftLeft = false;
        break;
    }
  };

  // @HostListener('window:focus')
  // onWindowFocusHandler() {
  //   if (this.gameService.player && !this.gameService.player.isDead && !this.stateGameDialog$.value) {
  //     this._continueGame();
  //   }
  // }

  // @HostListener('window:blur')
  // onWindowBlurHandler() {
  //   if (this.gameService.player) this._pauseGame();
  // }

  // public getLivesAsArray(): void[] {
  //   return new Array(this.gameService.player.lives);
  // }

  // public getObjectPosition(x: number, y: number, direction?: EDirection): SafeStyle {
  //   return this._domSanitizer.bypassSecurityTrustStyle(`translate(${x}px, ${y}px) ${direction || ''}`);
  // }

  private gameLoop(): void {
    // if (!this._pauseGameToggler) {
    // if (this.isKeydownArrowUp) {
    //   // if (this.gameService.player instanceof FlyingPlayer) this.gameService.player.stepToUp();
    //   // if (this.gameService.player instanceof GoingPlayer) this.gameService.player.jump();
    //   this.gameService.hero.
    // }
    // if (this._isKeydownArrowDown && this.gameService.player instanceof FlyingPlayer) {
    //   this.gameService.player.stepToDown();
    // }
    if (this.isKeydownArrowLeft) this.heroService.hero.stepToLeft();
    if (this.isKeydownArrowRight) this.heroService.hero.stepToRight();
    if (this.isKeydownSpace) this.heroService.hero.attack();
    if (this.isKeydownControlLeft) this.heroService.hero.activateShield();
    if (this.isKeydownShiftLeft) this.heroService.hero.speed();

    this.heroService.hero.drawAttackNodeElements();
    this.heroService.hero.render();
    // this._monsterService.drawMonsters();
    // this._worker.postMessage(this._getDataCollisions());
    // }
    this.requestIdAnimationFrameId = requestAnimationFrame(this.gameLoop.bind(this));
  }

  // private _gameOver(): void {
  //   this.audioService.gameOver.restart();
  //   this._toggleGameDialog();
  //   // this.gameDialogMode$.next(EGameDialogMode.GameOver);
  //   this._saveResultGameInTopTable();
  //   this._pauseGame();
  // }

  // private _saveResultGameInTopTable(): void {
  //   const currentTopTableData: ITableItem = {
  //     name: this.gameService.player.name,
  //     score: this.gameService.player.score,
  //     date: new Date(),
  //   };

  //   const topTableDataFromLocalStorage: ITableItem[] = JSON.parse(localStorage.getItem(ELocalStorageKey.TopTableData));

  //   if (topTableDataFromLocalStorage === null) {
  //     localStorage.setItem(ELocalStorageKey.TopTableData, JSON.stringify([currentTopTableData]));
  //   } else {
  //     topTableDataFromLocalStorage.push(currentTopTableData);
  //     localStorage.setItem(ELocalStorageKey.TopTableData, JSON.stringify(topTableDataFromLocalStorage));
  //   }
  // }

  // private _toggleGameDialog(): void {
  //   if (this.stateGameDialog$.value) {
  //     this.audioService.past.restart();
  //     this.stateGameDialog$.next(false);
  //   } else {
  //     // this.gameDialogMode$.next(EGameDialogMode.Game);
  //     this.audioService.shortTomahawk.restart();
  //     this.stateGameDialog$.next(true);
  //   }
  // }

  // private _pauseGame(): void {
  //   this._pauseGameToggler = true;
  //   this._monsterService.pauseGenerateMonsters();
  // }

  // private _continueGame(): void {
  //   this._pauseGameToggler = false;
  //   this._monsterService.startGenerateMonsters();
  // }

  // private _fabricAttackNodeElement(settings: IAttackNodeElementSettings): EmbeddedViewRef<IAttackNodeElementSettings> {
  //   const attackNodeElement = this.attackNodeElementTemplate.createEmbeddedView(settings);
  //   this.gameField.insert(attackNodeElement);

  //   return attackNodeElement;
  // }

  // private _fabricMonsterNodeElement(settings: Monster): EmbeddedViewRef<Monster> {
  //   const monsterNodeElement = this.monsterNodeElementTemplate.createEmbeddedView(settings);
  //   this.gameField.insert(monsterNodeElement);

  //   return monsterNodeElement;
  // }

  // private _getDataCollisions(): IWorkerData {
  //   return {
  //     player: {
  //       positionInPx: this.gameService.player.positionInPx,
  //       sizeInPx: this.gameService.player.sizeInPx,
  //     },

  //     playerAttacks: this.gameService.player.attackObjects.map((ao) => ({
  //       leftInPx: ao.attackNodeElement.context.leftInPx,
  //       topInPx: ao.attackNodeElement.context.topInPx,
  //       sizeInPx: ao.attackNodeElement.context.sizeInPx,
  //     })),

  //     monsters: this._monsterService.monsterObjects.map((mo) => ({
  //       positionInPx: mo.monster.positionInPx,
  //       sizeInPx: mo.monster.sizeInPx,
  //     })),

  //     monstersAttacks: this._monsterService.monsterObjects.map((mo) => {
  //       return mo.monster.attackNodeElements.map((ane) => ({
  //         leftInPx: ane.context.leftInPx,
  //         topInPx: ane.context.topInPx,
  //         sizeInPx: ane.context.sizeInPx,
  //       }));
  //     }),
  //   };
  // }
}
