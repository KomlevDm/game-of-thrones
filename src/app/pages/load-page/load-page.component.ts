import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ELocalStorageKey } from 'src/app/enums/ELocalStorageKey';
import { GameService } from '../../services/game.service';
import { AudioService } from '../../services/audio.service';
import { ISaveGameData } from './interfaces/ISaveGameData';

@Component({
  selector: 'load-page',
  templateUrl: './load-page.component.html',
  styleUrls: ['./load-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadPageComponent implements OnInit {
  constructor(public audioService: AudioService, public gameService: GameService) {}

  public saveGameData: ISaveGameData[] = [];

  ngOnInit() {
    const saveGameData: ISaveGameData[] = JSON.parse(localStorage.getItem(ELocalStorageKey.SaveGameData));

    if (saveGameData) {
      this.saveGameData = saveGameData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }

  public deleteSaveGame(index: number): void {
    this.saveGameData.splice(index, 1);
    localStorage.setItem(ELocalStorageKey.SaveGameData, JSON.stringify(this.saveGameData));
  }

  public trackBySessionId(index: number, item: ISaveGameData): string {
    return item.sessionId;
  }
}
