import { Component, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { EHouse } from 'src/app/enums/EHouse';
import { GameService } from 'src/app/services/game.service';
import { Player } from 'src/app/classes/player/Player';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'hero-selection-page',
  templateUrl: './hero-selection-page.component.html',
  styleUrls: ['./hero-selection-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSelectionPageComponent {
  constructor(private gameService: GameService, public audioService: AudioService) {}

  public EHouse = EHouse;
  public selectedHouse: EHouse = null;
  public playerNameControl = new FormControl(Player.defaultName, Validators.required);
  public houseRange = {
    [EHouse.Stark]: this.audioService.wolfRipsApartEnemy,
    [EHouse.Targaryen]: this.audioService.dragonRoar,
    [EHouse.Lannister]: this.audioService.lionRoar,
  };

  @HostListener('document:keydown.enter')
  public onKeydownEnterHandler() {
    this.startGame();
  }

  public selectHouse(house: EHouse): void {
    this.selectedHouse = house;

    Object.entries(this.houseRange).forEach(([key, value]) => {
      if (key !== house) {
        value.stop();
        return;
      }

      value.restart();
    });
  }

  public isAllowPlayGame(): boolean {
    return this.selectedHouse !== null && Boolean(this.playerNameControl.valid);
  }

  public startGame(): void {
    if (this.isAllowPlayGame()) {
      this.gameService.startGame(this.playerNameControl.value, this.selectedHouse);
    }
  }
}
