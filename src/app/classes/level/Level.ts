import { EGameBackgroundName } from 'src/app/pages/game-page/game-background/enums/EGameBackgroundName';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

export class Level {
  private _number: number;
  private _name: string;
  private _gameBackgroundName: string;

  public get number(): number {
    return this._number;
  }

  public get name(): string {
    return this._name;
  }

  public get gameBackgroundName(): string {
    return this._gameBackgroundName;
  }

  constructor(number = 1) {
    this.setLevel(number);
  }

  public prevLevel(): number {
    if (this._number === 1) return this._number;

    this._number -= 1;
    this.setLevel(this._number);
  }

  public nextLevel(): number {
    if (this._number >= Object.entries(EGameBackgroundName).length) return this._number;

    this._number += 1;
    this.setLevel(this._number);
  }

  private setLevel(number: number): void {
    switch (number) {
      case 2:
        this._number = 2;
        this._name = marker('Level.Name.SnowForest');
        this._gameBackgroundName = EGameBackgroundName.SnowForest;
        break;

      default:
        this._number = 1;
        this._name = marker('Level.Name.Mountains');
        this._gameBackgroundName = EGameBackgroundName.Mountains;
        break;
    }
  }
}
