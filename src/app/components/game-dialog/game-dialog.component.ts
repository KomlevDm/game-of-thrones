import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SoundsService } from 'src/app/services/sounds.service';
import { GameService } from 'src/app/services/game.service';

export enum EMode {
  Game,
  Save,
  GameOver
}

@Component({
  selector: 'game-dialog',
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.scss']
})
export class GameDialogComponent {
  constructor(private _gameService: GameService, public soundsService: SoundsService) {}

  @Input() state$: BehaviorSubject<boolean>;
  @Input() mode$: BehaviorSubject<EMode>;

  public EMode = EMode;
  public saveGameName = this._gameService.saveGameName || 'No name';

  public mouseenterButtonMenu(): void {
    this.soundsService.blade.restart();
  }

  public restartGame(): void {
    this._gameService.restartGame();
    this.close();
  }

  public close(): void {
    this.soundsService.past.restart();
    this.state$.next(false);
  }

  public save(): void {
    this._gameService.saveGame(this.saveGameName);
    this.mode$.next(EMode.Game);
  }
}
