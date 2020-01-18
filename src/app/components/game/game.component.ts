import { Component, OnInit, HostListener } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { SoundsService } from 'src/app/services/sounds.service';
import { Router } from '@angular/router';
import { Player } from 'src/app/classes/Player';
import { Targaryen } from 'src/app/classes/Targaryen';
import { Lannister } from 'src/app/classes/Lannister';
import { Stark } from 'src/app/classes/Stark';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  constructor(private router: Router, public soundsService: SoundsService, public gameService: GameService) {
    this.player = gameService.player;
  }

  private _isKeydownArrowUp = false;
  private _isKeydownArrowDown = false;
  private _isKeydownArrowLeft = false;
  private _isKeydownArrowRight = false;
  private _isKeydownSpace = false;

  public player: Player;

  ngOnInit() {
    if (this.isPlayerExists()) this.gameLoop();
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
        if (!this.isPlayerExists()) {
          this.soundsService.dragonStompy.restart();
          this.router.navigateByUrl('/hero-selection');
        } else {
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

    this._isKeydownSpace = true;
  }

  public gameLoop(): void {
    if (this._isKeydownArrowUp) {
      if (this.player instanceof Targaryen) this.player.stepToUp();

      if (this.player instanceof Stark || this.player instanceof Lannister) this.player.jump();
    }

    if (this._isKeydownArrowDown) {
      if (this.player instanceof Targaryen) this.player.stepToDown();
    }

    if (this._isKeydownArrowLeft) this.player.stepToLeft();

    if (this._isKeydownArrowRight) this.player.stepToRight();

    if (this._isKeydownSpace) {
    }

    requestAnimationFrame(this.gameLoop.bind(this));
  }

  public isPlayerExists(): boolean {
    return this.player !== null;
  }
}
