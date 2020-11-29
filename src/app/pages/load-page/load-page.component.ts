import { Component, OnInit, HostListener, ChangeDetectionStrategy } from '@angular/core';
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
  selector: 'load-page',
  templateUrl: './load-page.component.html',
  styleUrls: ['./load-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadPageComponent implements OnInit {
  constructor(public gameService: GameService) {}

  public saveGameData: ISaveGameData[] = [];

  ngOnInit() {
    const saveGameData: ISaveGameData[] = JSON.parse(localStorage.getItem(EKeyLocalStorage.SaveGameData));

    if (saveGameData !== null) {
      this.saveGameData = saveGameData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }

  @HostListener('document:keydown.escape')
  onKeydownEscapeHandler() {
    this.gameService.navigateToMainMenu();
  }

  public deleteSaveGame(index: number): void {
    this.saveGameData.splice(index, 1);

    localStorage.setItem(EKeyLocalStorage.SaveGameData, JSON.stringify(this.saveGameData));
  }

  public trackBySessionId(index: number, item: ISaveGameData): string {
    return item.sessionId;
  }
}
