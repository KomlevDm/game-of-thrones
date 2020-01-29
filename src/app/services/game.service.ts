import { Injectable } from '@angular/core';
import { Player, IPlayerSettings } from '../classes/player/Player';
import { EHouse } from '../enums/EHouse';
import { Stark } from '../classes/player/Stark';
import { Targaryen } from '../classes/player/Targaryen';
import { Lannister } from '../classes/player/Lannister';
import { EKeyLocalStorage } from '../enums/EKeyLocalStorage';
import { ISaveGameData } from '../components/load/load.component';
import { v1 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { SoundsService } from './sounds.service';
import { MonsterService } from './monster.service';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor(
    private _router: Router,
    private _soundsService: SoundsService,
    private _monsterService: MonsterService
  ) {}

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
    this._player = this._getInstancePlayer(house, { name });

    this._createGameSession();

    this._router.navigateByUrl('/game');

    this._soundsService.startGame.play();
  }

  public restartGame(): void {
    this._player = this._getInstancePlayer(this._player.house, { name: this._player.name });

    this._monsterService.restartGenerateMonster();

    this._createGameSession();

    this._soundsService.startGame.play();
  }

  public loadGame(gameData: ISaveGameData): void {
    this._saveGameName = gameData.name;

    this._player = this._getInstancePlayer(gameData.player.house, gameData.player);

    this._createGameSession(gameData.sessionId);

    this._router.navigateByUrl('/game');

    this._soundsService.startGame.play();
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

  private _getInstancePlayer(house: EHouse, settings: IPlayerSettings): Player {
    const shield = {
      ...settings.shield,
      sound: this._soundsService.shield.restart.bind(this._soundsService.shield)
    };

    switch (house) {
      case EHouse.Stark:
        return new Stark({
          ...settings,
          shield,
          attack: {
            ...settings.attack,
            sound: this._soundsService.starkAttack.restart.bind(this._soundsService.starkAttack)
          }
        });

      case EHouse.Targaryen:
        return new Targaryen({
          ...settings,
          shield,
          attack: {
            ...settings.attack,
            sound: this._soundsService.targaryenAttack.restart.bind(this._soundsService.targaryenAttack)
          }
        });

      case EHouse.Lannister:
        return new Lannister({
          ...settings,
          shield,
          attack: {
            ...settings.attack,
            sound: this._soundsService.lannisterAttack.restart.bind(this._soundsService.lannisterAttack)
          }
        });
    }
  }

  private _deleteUnderscoreForKey(key: string): string {
    return key.replace('_', '');
  }

  private _isValidKey(key: string): boolean {
    return !key.includes('attack') && !key.includes('$');
  }
}
