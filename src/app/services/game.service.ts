import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';
import { EHouse } from '../enums/EHouse';
import { ELocalStorageKey } from '../enums/ELocalStorageKey';
import { ISaveGameData } from '../pages/load-page/interfaces/ISaveGameData';
import { AudioService } from './audio.service';
import { HeroService } from './hero.service';
import { MonsterService } from './monster.service';

@Injectable()
export class GameService {
  constructor(
    private router: Router,
    private audioService: AudioService,
    private monsterService: MonsterService,
    private heroService: HeroService
  ) {}

  private _gameSession: string;
  private _saveGameName: string;

  public get saveGameName(): string {
    return this._saveGameName;
  }

  public async playGame(playerName: string, house: EHouse): Promise<void> {
    this.heroService.createHero({ name: playerName, house });

    // this._createGameSession();

    await this.router.navigateByUrl('/game');

    this.audioService.playGame.play();
  }

  public restartGame(): void {
    // this._hero.attackObjects.forEach((a) => a.attackNodeElement.destroy());
    // const fabricAttackNodeElement = this.hero.fabricAttackNodeElement;
    // this._hero = this.heroService.createHero(this._hero.house, { name: this._hero.name });
    // this.hero.initFabricAttack(fabricAttackNodeElement);
    // this.monsterService.restartGenerateMonster();
    // this._createGameSession();
    // this.audioService.playGame.play();
  }

  public loadGame(gameData: ISaveGameData): void {
    this._saveGameName = gameData.name;

    this.heroService.createHero({ house: gameData.hero.house, ...gameData.hero });

    this._createGameSession(gameData.sessionId);

    this.router.navigateByUrl('/game');

    this.audioService.playGame.play();
  }

  public saveGame(name: string): void {
    const currentGameData = {
      sessionId: this._gameSession,
      name,
      hero: this.heroService.getSaveData(),
      date: new Date().toString(),
    };

    const saveDataFromLocalStorage: ISaveGameData[] = JSON.parse(localStorage.getItem(ELocalStorageKey.SaveGameData));

    if (saveDataFromLocalStorage === null) {
      localStorage.setItem(ELocalStorageKey.SaveGameData, JSON.stringify([currentGameData]));
    } else {
      const oldGameDataIndex = saveDataFromLocalStorage.findIndex(
        (elem) => elem.sessionId === this._gameSession && elem.name === name
      );

      if (oldGameDataIndex === -1) saveDataFromLocalStorage.push(currentGameData);
      else saveDataFromLocalStorage[oldGameDataIndex] = currentGameData;

      localStorage.setItem(ELocalStorageKey.SaveGameData, JSON.stringify(saveDataFromLocalStorage));
    }
  }

  public cleanGameInfo(): void {
    this.heroService.deleteHero();
    this._gameSession = null;
    this._saveGameName = null;
  }

  private _createGameSession(sessionId?: string): void {
    this._gameSession = sessionId || uuid();
  }
}
