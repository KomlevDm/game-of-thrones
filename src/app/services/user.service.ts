import { Injectable } from '@angular/core';
import { AudioService } from './audio.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private audioService: AudioService) {}

  private _isGameActivated = false;

  public get isGameActivated(): boolean {
    return this._isGameActivated;
  }

  public activateGame(): void {
    this.audioService.init();
    this._isGameActivated = true;
  }
}
