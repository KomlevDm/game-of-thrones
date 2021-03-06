import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { v4 as uuid } from 'uuid';
import { EHouse } from '../enums/EHouse';
import { ELocalStorageKey } from '../enums/ELocalStorageKey';
import { ISaveGameData } from '../pages/load-page/interfaces/ISaveGameData';
import { AudioService } from './audio.service';
import { HeroService } from './hero.service';
import { MonsterService } from './monster.service';

@Injectable()
export class GameService {
  private static gameRender: GameRenderType;

  public static readonly HERO_DEFAULT_NAME = marker('Game.HeroDefaultName');
  public static readonly SIZE_FIELD_GAME_IN_PX: {
    readonly WIDTH: number;
    readonly HEIGHT: number;
    readonly FLYING_HEIGHT: number;
  } = {
    WIDTH: 1300,
    HEIGHT: 650,
    FLYING_HEIGHT: 510,
  };

  private _gameSession: string;
  private _saveGameName: string;

  public get saveGameName(): string {
    return this._saveGameName;
  }

  constructor(
    private router: Router,
    private audioService: AudioService,
    private monsterService: MonsterService,
    private heroService: HeroService
  ) {}

  public static initGameRender(gameRender: GameRenderType): void {
    GameService.gameRender = gameRender;
  }

  public static getGameRender(): GameRenderType {
    return GameService.gameRender;
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

  public clearGame(): void {
    GameService.gameRender = null;
    this.heroService.deleteHero();
    this._gameSession = null;
    this._saveGameName = null;
  }

  private _createGameSession(sessionId?: string): void {
    this._gameSession = sessionId || uuid();
  }
}

export type GameRenderType = {
  readonly gameField: ViewContainerRef;
  readonly cfr: ComponentFactoryResolver;
};
