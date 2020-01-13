import { Component, HostListener } from '@angular/core';
import { SoundsService } from 'src/app/services/sounds.service';
import { Router } from '@angular/router';
import { EHouse } from 'src/app/enums/EHouse';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'hero-selection',
  templateUrl: './hero-selection.component.html',
  styleUrls: ['./hero-selection.component.scss']
})
export class HeroSelectionComponent {
  constructor(private router: Router, public soundsService: SoundsService, public playerService: PlayerService) {}

  public EHouse = EHouse;

  @HostListener('document:keydown.escape')
  onKeydownEscapeHandler() {
    this.soundsService.dragonStompy.restart();
    this.router.navigateByUrl('');
  }

  public selectHouse(house: EHouse) {
    this.playerService.house = house;

    switch (house) {
      case EHouse.Stark:
        this.soundsService.dragonRoar.stop();
        this.soundsService.swordBattle.restart();
        break;

      case EHouse.Targaryen:
        this.soundsService.swordBattle.stop();
        this.soundsService.dragonRoar.restart();
        break;
    }
  }

  public isAllowPlay(): boolean {
    return this.playerService.house !== null && Boolean(this.playerService.name);
  }
}
