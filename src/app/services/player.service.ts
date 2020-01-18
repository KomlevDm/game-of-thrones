import { Injectable } from '@angular/core';
import { EHouse } from '../enums/EHouse';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  constructor() {}

  public name = 'Player-1';
  public house: EHouse = EHouse.Targaryen;
  public position = { x: 0, y: 0 };
  public sizeInPx = 150;
  public direction = 'unset';
}
