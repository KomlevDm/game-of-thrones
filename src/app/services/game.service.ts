import { Injectable, Type } from '@angular/core';
import { Player, IPlayerSettings } from '../classes/Player';
import { EHouse } from '../enums/EHouse';
import { Stark } from '../classes/Stark';
import { Targaryen } from '../classes/Targaryen';
import { Lannister } from '../classes/Lannister';
import { EKeyLocalStorage } from '../enums/EKeyLocalStorage';

interface ISaveData {
  name: string;
  player: IPlayerSettings;
  date: string;
}

@Injectable({ providedIn: 'root' })
export class GameService {
  private _player: Player = null;

  public get player(): Player {
    return this._player;
  }

  public createPlayer(name: string, house: EHouse): void {
    const ClassOfHouse = this._getClassRorHouse(house);
    this._player = new ClassOfHouse({ name });
  }

  public loadGame(gameData: ISaveData): void {
    const ClassOfHouse = this._getClassRorHouse(gameData.player.house);
    this._player = new ClassOfHouse(gameData.player);
  }

  public saveGame(name: string): void {
    const currentSaveData = {
      name,
      player: Object.create(null),
      date: new Date().toString()
    };
    for (const key in this._player) {
      if (this._player.hasOwnProperty(key) && this._isValidKey(key)) {
        currentSaveData.player[this._deleteUnderscoreForKey(key)] = this._player[key];
      }
    }

    const saveDataFromLocalStorage: ISaveData[] = JSON.parse(localStorage.getItem(EKeyLocalStorage.SaveData));

    if (saveDataFromLocalStorage === null) {
      localStorage.setItem(EKeyLocalStorage.SaveData, JSON.stringify([currentSaveData]));
    } else {
      saveDataFromLocalStorage.push(currentSaveData);
      localStorage.setItem(EKeyLocalStorage.SaveData, JSON.stringify(saveDataFromLocalStorage));
    }
  }

  public restartGame(): void {
    const ClassOfHouse = this._getClassRorHouse(this._player.house);
    this._player = new ClassOfHouse({ name: this._player.name });
  }

  private _getClassRorHouse(house: EHouse): Type<Player> {
    switch (house) {
      case EHouse.Stark:
        return Stark;

      case EHouse.Targaryen:
        return Targaryen;

      case EHouse.Lannister:
        return Lannister;
    }
  }

  private _deleteUnderscoreForKey(key: string): string {
    return key.replace('_', '');
  }

  private _isValidKey(key: string): boolean {
    return !key.includes('attack') && !key.includes('$');
  }
}
