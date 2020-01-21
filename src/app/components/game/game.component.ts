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
import { Player, ISettingsAttackNodeElement } from 'src/app/classes/Player';
import { Targaryen } from 'src/app/classes/Targaryen';
import { Lannister } from 'src/app/classes/Lannister';
import { Stark } from 'src/app/classes/Stark';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  constructor(private _router: Router, public soundsService: SoundsService, public gameService: GameService) {
    this.player = gameService.player;
    if (this.player) this.player.initAttack(this._fabricAttackNodeElement.bind(this));
  }

  private _destroyedComponent$ = new Subject();
  private _isKeydownArrowUp = false;
  private _isKeydownArrowDown = false;
  private _isKeydownArrowLeft = false;
  private _isKeydownArrowRight = false;
  private _isKeydownSpace = false;
  private _pauseGame = false;

  public player: Player;
  public stateGameDialog$ = new BehaviorSubject(false);

  @ViewChild('gameField', { static: false, read: ViewContainerRef }) gameField: ViewContainerRef;
  @ViewChild('attack', { static: false }) attackNodeElementTemplate: TemplateRef<ISettingsAttackNodeElement>;

  ngOnInit() {
    this.stateGameDialog$
      .pipe(takeUntil(this._destroyedComponent$))
      .subscribe(dialogState => (this._pauseGame = dialogState));

    if (this.isPlayerExists()) this.gameLoop();
  }

  ngOnDestroy() {
    this._destroyedComponent$.next();
    this._destroyedComponent$.complete();
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

      case 'Escape':
        if (this.isPlayerExists()) this._toggleGameDialog();
        else {
          this.soundsService.dragonStompy.restart();
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
    }
  }

  public gameLoop(): void {
    if (!this._pauseGame) {
      if (this._isKeydownArrowUp) {
        if (this.player instanceof Targaryen) this.player.stepToUp();

        if (this.player instanceof Stark || this.player instanceof Lannister) this.player.jump();
      }

      if (this._isKeydownArrowDown) {
        if (this.player instanceof Targaryen) this.player.stepToDown();
      }

      if (this._isKeydownArrowLeft) this.player.stepToLeft();

      if (this._isKeydownArrowRight) this.player.stepToRight();

      if (this._isKeydownSpace) this.player.attack();
    }

    this.player.drawAttackNodeElements();

    requestAnimationFrame(this.gameLoop.bind(this));
  }

  public isPlayerExists(): boolean {
    return this.player !== null;
  }

  public getLivesAsArray(): void[] {
    return new Array(this.player.lives);
  }

  private _toggleGameDialog(): void {
    if (this.stateGameDialog$.value) {
      this.soundsService.past.restart();
      this.stateGameDialog$.next(false);
    } else {
      this.soundsService.shortTomahawk.restart();
      this.stateGameDialog$.next(true);
    }
  }

  private _fabricAttackNodeElement(settings: ISettingsAttackNodeElement): EmbeddedViewRef<ISettingsAttackNodeElement> {
    const attackNodeElement = this.attackNodeElementTemplate.createEmbeddedView(settings);
    this.gameField.insert(attackNodeElement);

    return attackNodeElement;
  }
}
