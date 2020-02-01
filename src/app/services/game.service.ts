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
    this._player = this._createInstancePlayer(house, { name });

    this._createGameSession();

    this._router.navigateByUrl('/game');

    this._soundsService.startGame.play();
  }

  public restartGame(): void {
    this._player.attackObjects.forEach(a => a.attackNodeElement.destroy());
    const fabricAttackNodeElement = this.player.fabricAttackNodeElement;

    this._player = this._createInstancePlayer(this._player.house, { name: this._player.name });
    this.player.initFabricAttack(fabricAttackNodeElement);

    this._monsterService.restartGenerateMonster();

    this._createGameSession();

    this._soundsService.startGame.play();
  }

  public loadGame(gameData: ISaveGameData): void {
    this._saveGameName = gameData.name;

    this._player = this._createInstancePlayer(gameData.player.house, gameData.player);

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

  public mouseenterButton(): void {
    this._soundsService.blade.restart();
  }

  public cleanGameInfo(): void {
    this._player = null;
    this._gameSession = null;
    this._saveGameName = null;
  }

  private _createGameSession(sessionId?: string): void {
    this._gameSession = sessionId || uuid();
  }

  private _createInstancePlayer(house: EHouse, settings: IPlayerSettings): Player {
    switch (house) {
      case EHouse.Stark:
        return new Stark(settings);

      case EHouse.Targaryen:
        return new Targaryen(settings);

      case EHouse.Lannister:
        return new Lannister(settings);
    }
  }

  private _deleteUnderscoreForKey(key: string): string {
    return key.replace('_', '');
  }

  private _isValidKey(key: string): boolean {
    return !key.includes('attack') && !key.includes('$');
  }
}
