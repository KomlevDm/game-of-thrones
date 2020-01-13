import { Injectable } from '@angular/core';
import { EHouse } from '../enums/EHouse';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  constructor() {}

  public name = 'Player-1';
  public house: EHouse = null;
}
