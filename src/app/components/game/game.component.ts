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
import { ISettingsAttackNodeElement } from 'src/app/classes/Player';
import { Targaryen } from 'src/app/classes/Targaryen';
import { Lannister } from 'src/app/classes/Lannister';
import { Stark } from 'src/app/classes/Stark';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EMode } from '../game-dialog/game-dialog.component';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  constructor(private _router: Router, private _soundsService: SoundsService, public gameService: GameService) {
    if (this.gameService.player) this.gameService.player.initAttack(this._fabricAttackNodeElement.bind(this));
  }

  private _destroyedComponent$ = new Subject();
  private _isKeydownArrowUp = false;
  private _isKeydownArrowDown = false;
  private _isKeydownArrowLeft = false;
  private _isKeydownArrowRight = false;
  private _isKeydownSpace = false;
  private _isKeydownControlLeft = false;
  private _pauseGame = false;
  private _requestIdAnimationFrame: number;
  private _isGameOver = false;

  public stateGameDialog$ = new BehaviorSubject(false);
  public gameMode$ = new BehaviorSubject(EMode.Game);

  @ViewChild('gameField', { static: false, read: ViewContainerRef }) gameField: ViewContainerRef;
  @ViewChild('attack', { static: false }) attackNodeElementTemplate: TemplateRef<ISettingsAttackNodeElement>;

  ngOnInit() {
    this.stateGameDialog$
      .pipe(takeUntil(this._destroyedComponent$))
      .subscribe(dialogState => (this._pauseGame = dialogState));

    if (this.isPlayerExists()) this.gameLoop();
  }

  ngOnDestroy() {
    this.gameService.cleanGameInfo();

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
        if (this.isPlayerExists() && !this._isGameOver) this._toggleGameDialog();
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

  public gameLoop(): void {
    if (!this._pauseGame) {
      if (this._isKeydownArrowUp) {
        if (this.gameService.player instanceof Targaryen) this.gameService.player.stepToUp();

        if (this.gameService.player instanceof Stark || this.gameService.player instanceof Lannister) {
          this.gameService.player.jump();
        }
      }

      if (this._isKeydownArrowDown) {
        if (this.gameService.player instanceof Targaryen) this.gameService.player.stepToDown();
      }

      if (this._isKeydownArrowLeft) this.gameService.player.stepToLeft();

      if (this._isKeydownArrowRight) this.gameService.player.stepToRight();

      if (this._isKeydownSpace) {
        this.gameService.player.attack();

        if (this.gameService.player instanceof Stark) this._soundsService.starkAttack.restart();

        if (this.gameService.player instanceof Targaryen) this._soundsService.targaryenAttack.restart();

        if (this.gameService.player instanceof Lannister) this._soundsService.lannisterAttack.restart();
      }

      if (this._isKeydownControlLeft) {
        if (this.gameService.player.activateShield()) this._soundsService.shield.restart();
      }
    }

    this.gameService.player.drawAttackNodeElements();

    this._requestIdAnimationFrame = requestAnimationFrame(this.gameLoop.bind(this));
  }

  public isPlayerExists(): boolean {
    return this.gameService.player !== null;
  }

  public getLivesAsArray(): void[] {
    return new Array(this.gameService.player.lives);
  }

  private _toggleGameDialog(): void {
    if (this.stateGameDialog$.value) {
      this._soundsService.past.restart();
      this.stateGameDialog$.next(false);
    } else {
      this.gameMode$.next(EMode.Game);
      this._soundsService.shortTomahawk.restart();
      this.stateGameDialog$.next(true);
    }
  }

  private _fabricAttackNodeElement(settings: ISettingsAttackNodeElement): EmbeddedViewRef<ISettingsAttackNodeElement> {
    const attackNodeElement = this.attackNodeElementTemplate.createEmbeddedView(settings);
    this.gameField.insert(attackNodeElement);

    return attackNodeElement;
  }
}
