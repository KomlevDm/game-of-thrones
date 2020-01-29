import { Component, OnInit, HostListener } from '@angular/core';
import { SoundsService } from 'src/app/services/sounds.service';
import { IPlayerSettings } from 'src/app/classes/player/Player';
import { EKeyLocalStorage } from 'src/app/enums/EKeyLocalStorage';
import { GameService } from 'src/app/services/game.service';

export interface ISaveGameData {
  sessionId: string;
  name: string;
  player: IPlayerSettings;
  date: string;
}

@Component({
  selector: 'load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})
export class LoadComponent implements OnInit {
  constructor(private _gameService: GameService, private _soundsService: SoundsService) {}

  public saveGameData: ISaveGameData[] = [];

  ngOnInit() {
    const saveGameData: ISaveGameData[] = JSON.parse(localStorage.getItem(EKeyLocalStorage.SaveGameData));

    if (saveGameData !== null) {
      this.saveGameData = saveGameData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }

  @HostListener('document:keydown.escape')
  onKeydownEscapeHandler() {
    this._gameService.navigateToMainMenu();
  }

  public deleteSaveGame(index: number): void {
    this.saveGameData.splice(index, 1);

    localStorage.setItem(EKeyLocalStorage.SaveGameData, JSON.stringify(this.saveGameData));
  }

  public loadSaveGame(saveGame: ISaveGameData): void {
    this._gameService.loadGame(saveGame);
  }

  public mouseenterButton(): void {
    this._soundsService.blade.restart();
  }
}
