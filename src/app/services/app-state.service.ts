import { Injectable } from '@angular/core';
import { AudioService } from './audio.service';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private _isGameActivated = false;

  public get isGameActivated(): boolean {
    return this._isGameActivated;
  }

  constructor(private readonly audioService: AudioService) {}

  public activateGame(): void {
    this.audioService.init();
    this._isGameActivated = true;
  }
}
