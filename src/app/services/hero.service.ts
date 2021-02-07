import { Injectable } from '@angular/core';
import { Hero, IHeroSettings } from '../classes/game/hero/Hero';
import { Lannister } from '../classes/game/hero/Lannister';
import { Stark } from '../classes/game/hero/Stark';
import { EHouse } from '../enums/EHouse';

@Injectable()
export class HeroService {
  private _hero: Hero;

  public get hero(): Hero {
    return this._hero;
  }

  public createHero(settings: any): void {
    switch (settings.house) {
      case EHouse.Stark:
        this._hero = new Stark(settings);
        break;

      case EHouse.Lannister:
        this._hero = new Lannister(settings);
        break;
    }
  }

  public getSaveData(): IHeroSettings {
    const saveData = Object.create(null);

    for (const key in this._hero) {
      if (this._hero.hasOwnProperty(key) && this.isValidKey(key)) {
        saveData[this.deleteUnderscoreKey(key)] = this._hero[key];
      }
    }

    return saveData;
  }

  public deleteHero(): void {
    this._hero = null;
  }

  private isValidKey(key: string): boolean {
    return !key.includes('attack') && !key.includes('$');
  }

  private deleteUnderscoreKey(key: string): string {
    return key.replace('_', '');
  }
}
