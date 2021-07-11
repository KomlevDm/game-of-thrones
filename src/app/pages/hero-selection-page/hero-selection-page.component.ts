import { Component, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { EHouse } from 'src/app/enums/EHouse';
import { GameService } from 'src/app/services/game.service';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'hero-selection-page',
  templateUrl: './hero-selection-page.component.html',
  styleUrls: ['./hero-selection-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSelectionPageComponent {
  private readonly selectedHousesAudio = {
    [EHouse.Stark]: this.audioService.wolfRipsApartEnemy,
    [EHouse.Targaryen]: this.audioService.dragonRoar,
    [EHouse.Lannister]: this.audioService.lionRoar,
  };

  public playerNameControl: FormControl;
  public EHouse = EHouse;
  public selectedHouse: EHouse;

  public get isAllowPlayGame(): boolean {
    return this.selectedHouse && this.playerNameControl.valid;
  }

  constructor(
    private readonly gameService: GameService,
    private readonly audioService: AudioService,
    private readonly translateService: TranslateService
  ) {
    this.translateService.get(GameService.HERO_DEFAULT_NAME).subscribe((heroDefaultName) => {
      this.playerNameControl = new FormControl(heroDefaultName, Validators.required);
    });
  }

  public selectHouse(selectedHouse: EHouse): void {
    this.selectedHouse = selectedHouse;

    Object.entries(this.selectedHousesAudio).forEach(([house, audio]) => {
      if (house !== selectedHouse) {
        audio.stop();
        return;
      }

      audio.restart();
    });
  }

  @HostListener('document:keydown.enter')
  public playGame() {
    if (!this.isAllowPlayGame) return;

    this.gameService.playGame(this.playerNameControl.value, this.selectedHouse);
  }
}
