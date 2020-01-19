import { Component, HostListener } from '@angular/core';
import { SoundsService } from 'src/app/services/sounds.service';
import { Router } from '@angular/router';
import { EHouse } from 'src/app/enums/EHouse';
import { GameService } from 'src/app/services/game.service';
import { Player } from 'src/app/classes/Player';

@Component({
  selector: 'hero-selection',
  templateUrl: './hero-selection.component.html',
  styleUrls: ['./hero-selection.component.scss']
})
export class HeroSelectionComponent {
  constructor(private _router: Router, public soundsService: SoundsService, public gameService: GameService) {}

  public EHouse = EHouse;
  public selectedHouse: EHouse = null;
  public playerName = Player.defaultName;

  @HostListener('document:keydown.escape')
  onKeydownEscapeHandler() {
    this.soundsService.dragonStompy.restart();
    this._router.navigateByUrl('');
  }

  public selectHouse(house: EHouse): void {
    this.selectedHouse = house;

    switch (house) {
      case EHouse.Stark:
        this.soundsService.dragonRoar.stop();
        this.soundsService.lionRoar.stop();
        this.soundsService.wolfRipsApartEnemy.restart();
        break;

      case EHouse.Targaryen:
        this.soundsService.wolfRipsApartEnemy.stop();
        this.soundsService.lionRoar.stop();
        this.soundsService.dragonRoar.restart();
        break;

      case EHouse.Lannister:
        this.soundsService.wolfRipsApartEnemy.stop();
        this.soundsService.dragonRoar.stop();
        this.soundsService.lionRoar.restart();
        break;
    }
  }

  public isAllowPlayGame(): boolean {
    return this.selectedHouse !== null && Boolean(this.playerName);
  }

  public startGame(): void {
    this.gameService.createPlayer(this.playerName, this.selectedHouse);

    this._router.navigateByUrl('game');
  }
}
