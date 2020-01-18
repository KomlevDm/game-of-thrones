import { Injectable, Type } from '@angular/core';
import { Player } from '../classes/Player';
import { EHouse } from '../enums/EHouse';
import { Stark } from '../classes/Stark';
import { Targaryen } from '../classes/Targaryen';
import { Lannister } from '../classes/Lannister';

@Injectable({ providedIn: 'root' })
export class GameService {
  public player: Player = null;

  public createPlayer(name: string, house: EHouse) {
    const ClassOfHouse = this.getClassRorHouse(house);
    this.player = new ClassOfHouse({ name });
  }

  public loadGame(): void {}

  public saveGame(): void {}

  private getClassRorHouse(house: EHouse): Type<Player> {
    switch (house) {
      case EHouse.Stark:
        return Stark;

      case EHouse.Targaryen:
        return Targaryen;

      case EHouse.Lannister:
        return Lannister;
    }
  }
}
