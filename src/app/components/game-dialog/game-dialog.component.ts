import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SoundsService } from 'src/app/services/sounds.service';
import { GameService } from 'src/app/services/game.service';

export enum EGameDialogMode {
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
  constructor(public gameService: GameService, public soundsService: SoundsService) {}

  @Input() state$: BehaviorSubject<boolean>;
  @Input() mode$: BehaviorSubject<EGameDialogMode>;

  public EMode = EGameDialogMode;
  public saveGameName = this.gameService.saveGameName || 'No name';

  public restartGame(): void {
    this.mode$.next(EGameDialogMode.Game);
    this.gameService.restartGame();
    this.close();
  }

  public close(): void {
    if (this.mode$.value === EGameDialogMode.GameOver) return;

    this.soundsService.past.restart();
    this.state$.next(false);
  }

  public save(): void {
    this.gameService.saveGame(this.saveGameName);
    this.mode$.next(EGameDialogMode.Game);
  }
}
