import { Component, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { SoundsService } from 'src/app/services/sounds.service';
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
  constructor(public gameService: GameService, public soundsService: SoundsService) {}

  public EHouse = EHouse;
  public selectedHouse: EHouse = null;
  public playerNameControl = new FormControl(Player.defaultName, Validators.required);
  public houseRange = {
    [EHouse.Stark]: this.soundsService.wolfRipsApartEnemy,
    [EHouse.Targaryen]: this.soundsService.dragonRoar,
    [EHouse.Lannister]: this.soundsService.lionRoar,
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
