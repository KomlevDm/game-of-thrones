import { Injectable, Type } from '@angular/core';
import { Player } from '../classes/Player';
import { EHouse } from '../enums/EHouse';
import { Stark } from '../classes/Stark';
import { Targaryen } from '../classes/Targaryen';
import { Lannister } from '../classes/Lannister';
import { EKeyLocalStorage } from '../enums/EKeyLocalStorage';
import { ISaveGameData } from '../components/load/load.component';

import { v1 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { SoundsService } from './sounds.service';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor(private _router: Router, private _soundsService: SoundsService) {}

  private _player: Player = null;
  private _gameSession: string = null;
  private _saveGameName: string = null;

  public get player(): Player {
    return this._player;
  }

  public get saveGameName(): string {
    return this._saveGameName;
  }

  public startGame(name: string, house: EHouse): void {
    const ClassOfHouse = this._getClassRorHouse(house);
    this._player = new ClassOfHouse({ name });

    this._createGameSession();

    this._router.navigateByUrl('/game');

    this._soundsService.startGame.play();
  }

  public restartGame(): void {
    const ClassOfHouse = this._getClassRorHouse(this._player.house);
    this._player = new ClassOfHouse({ name: this._player.name });

    this._createGameSession();

    this._soundsService.startGame.play();
  }

  public loadGame(gameData: ISaveGameData): void {
    this._saveGameName = gameData.name;

    const ClassOfHouse = this._getClassRorHouse(gameData.player.house);
    this._player = new ClassOfHouse(gameData.player);

    this._createGameSession(gameData.sessionId);

    this._soundsService.startGame.play();

    this._router.navigateByUrl('/game');
  }

  public saveGame(name: string): void {
    const currentGameData = {
      sessionId: this._gameSession,
      name,
      player: Object.create(null),
      date: new Date().toString()
    };

    for (const key in this._player) {
      if (this._player.hasOwnProperty(key) && this._isValidKey(key)) {
        currentGameData.player[this._deleteUnderscoreForKey(key)] = this._player[key];
      }
    }

    const saveDataFromLocalStorage: ISaveGameData[] = JSON.parse(localStorage.getItem(EKeyLocalStorage.SaveGameData));

    if (saveDataFromLocalStorage === null) {
      localStorage.setItem(EKeyLocalStorage.SaveGameData, JSON.stringify([currentGameData]));
    } else {
      const oldGameDataIndex = saveDataFromLocalStorage.findIndex(
        elem => elem.sessionId === this._gameSession && elem.name === name
      );

      if (oldGameDataIndex === -1) saveDataFromLocalStorage.push(currentGameData);
      else saveDataFromLocalStorage[oldGameDataIndex] = currentGameData;

      localStorage.setItem(EKeyLocalStorage.SaveGameData, JSON.stringify(saveDataFromLocalStorage));
    }
  }

  public navigateToMainMenu(): void {
    this._soundsService.dragonStompy.restart();
    this._router.navigateByUrl('/');
  }

  public cleanGameInfo(): void {
    this._player = null;
    this._gameSession = null;
    this._saveGameName = null;
  }

  private _createGameSession(sessionId?: string): void {
    this._gameSession = sessionId || uuid();
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
