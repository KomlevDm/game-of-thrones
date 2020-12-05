import { Injectable } from '@angular/core';
import { SoundsService } from './sounds.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private soundsService: SoundsService) {}

  private _isGameActivated = false;

  public get isGameActivated(): boolean {
    return this._isGameActivated;
  }

  public activateGame(): void {
    this.soundsService.init();
    this._isGameActivated = true;
  }
}
