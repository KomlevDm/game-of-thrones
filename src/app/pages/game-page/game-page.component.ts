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
import { UserService } from '../../services/user.service';
import { EHouse } from '../../enums/EHouse';
// import { EGameDialogMode } from '../../components/game-dialog/game-dialog.component';

@Component({
  selector: 'game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePageComponent  {
  constructor(
    private _router: Router,
    private audioService: AudioService,
    private _monsterService: MonsterService,
    private _cdr: ChangeDetectorRef,
    private _domSanitizer: DomSanitizer,
    public gameService: GameService,
     userService: UserService
  ) {
    userService.activateGame()
     gameService.startGame('test', EHouse.Lannister);
  }

  private _isKeydownArrowUp = false;
  private _isKeydownArrowDown = false;
  private _isKeydownArrowLeft = false;
  private _isKeydownArrowRight = false;
  private _isKeydownSpace = false;
  private _isKeydownControlLeft = false;
  private _pauseGameToggler = false;
  private _requestIdAnimationFrame: number;
  private _destroyedComponent$ = new Subject();
  private _worker = new Worker('../../app.worker.ts', { type: 'module' });

  public stateGameDialog$ = new BehaviorSubject(false);
  // public gameDialogMode$ = new BehaviorSubject(EGameDialogMode.Game);

  @ViewChild('gameField', { read: ViewContainerRef }) gameField: ViewContainerRef;
  @ViewChild('attackTemplate') attackNodeElementTemplate: TemplateRef<IAttackNodeElementSettings>;
  @ViewChild('monsterTemplate') monsterNodeElementTemplate: TemplateRef<Monster>;

  ngOnInit() {
    // if (!this.gameService.player) return;

    // this.stateGameDialog$.pipe(takeUntil(this._destroyedComponent$)).subscribe((dialogState) => {
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

    // this._gameLoop();
  }

  // ngOnDestroy() {
  //   this.gameService.cleanGameInfo();
  //   this._monsterService.cleanMonsterInfo();

  //   this._destroyedComponent$.next();
  //   this._destroyedComponent$.complete();

  //   cancelAnimationFrame(this._requestIdAnimationFrame);
  // }

  // @HostListener('document:keydown', ['$event'])
  // onKeydownHandler(event: KeyboardEvent) {
  //   switch (event.code) {
  //     case 'ArrowUp':
  //       this._isKeydownArrowUp = true;
  //       break;

  //     case 'ArrowDown':
  //       this._isKeydownArrowDown = true;
  //       break;

  //     case 'ArrowLeft':
  //       this._isKeydownArrowLeft = true;
  //       break;

  //     case 'ArrowRight':
  //       this._isKeydownArrowRight = true;
  //       break;

  //     case 'Space':
  //       this._isKeydownSpace = true;
  //       break;

  //     case 'ControlLeft':
  //       this._isKeydownControlLeft = true;
  //       break;

  //     case 'Escape':
  //       if (this.gameService.player) {
  //         if (this.gameService.player.isDead) return;

  //         this._toggleGameDialog();
  //       } else {
  //         this.audioService.dragonStompy.restart();
  //         this._router.navigateByUrl('/hero-selection');
  //       }

  //       break;
  //   }
  // }

  // @HostListener('document:keyup', ['$event'])
  // onKeyUpHandler(event: KeyboardEvent) {
  //   switch (event.code) {
  //     case 'ArrowUp':
  //       this._isKeydownArrowUp = false;
  //       break;

  //     case 'ArrowDown':
  //       this._isKeydownArrowDown = false;
  //       break;

  //     case 'ArrowLeft':
  //       this._isKeydownArrowLeft = false;
  //       break;

  //     case 'ArrowRight':
  //       this._isKeydownArrowRight = false;
  //       break;

  //     case 'Space':
  //       this._isKeydownSpace = false;
  //       break;

  //     case 'ControlLeft':
  //       this._isKeydownControlLeft = false;
  //       break;
  //   }
  // }

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

  // private _gameLoop(): void {
  //   if (!this._pauseGameToggler) {
  //     if (this._isKeydownArrowUp) {
  //       if (this.gameService.player instanceof FlyingPlayer) this.gameService.player.stepToUp();
  //       if (this.gameService.player instanceof GoingPlayer) this.gameService.player.jump();
  //     }

  //     if (this._isKeydownArrowDown && this.gameService.player instanceof FlyingPlayer) {
  //       this.gameService.player.stepToDown();
  //     }

  //     if (this._isKeydownArrowLeft) this.gameService.player.stepToLeft();

  //     if (this._isKeydownArrowRight) this.gameService.player.stepToRight();

  //     if (this._isKeydownSpace) this.gameService.player.attack();

  //     if (this._isKeydownControlLeft) this.gameService.player.activateShield();

  //     this.gameService.player.drawAttackNodeElements();
  //     this._monsterService.drawMonsters();

  //     this._worker.postMessage(this._getDataCollisions());
  //   }

  //   this._requestIdAnimationFrame = requestAnimationFrame(this._gameLoop.bind(this));

  //   this._cdr.markForCheck();
  // }

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
