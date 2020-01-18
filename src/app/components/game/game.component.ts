import { Component, OnInit, HostListener } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { EHouse } from 'src/app/enums/EHouse';
import { SoundsService } from 'src/app/services/sounds.service';
import { Router } from '@angular/router';

const pathToPlayerImg = '../../../assets/img/game/';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  constructor(private router: Router, public soundsService: SoundsService, public playerService: PlayerService) {}

  ngOnInit() {}

  @HostListener('document:keydown.escape')
  onKeydownEscapeHandler() {
    if (!this.isPlayerExists()) {
      this.soundsService.dragonStompy.restart();
      this.router.navigateByUrl('/hero-selection');
    } else {
    }
  }

  @HostListener('document:keydown.arrowUp')
  onKeydownArrowUpHandler() {
    this.playerService.position.y -= 3;
  }

  @HostListener('document:keydown.arrowRight')
  onKeydownArrowRightHandler() {
    this.playerService.position.x += 3;
    this.playerService.direction = 'unset';

    console.log(222);
  }

  @HostListener('document:keydown.arrowDown')
  onKeydownArrowDownHandler() {
    this.playerService.position.y += 3;
  }

  @HostListener('document:keydown.arrowLeft')
  onKeydownArrowLeftHandler() {
    this.playerService.position.x -= 3;
    this.playerService.direction = 'scale(-1, 1)';
  }

  @HostListener('document:keydown.space')
  onKeydownSpaceHandler() {
    console.log(1);

    const event = new KeyboardEvent('keyup', {
      key: 'ArrowRight'
    });

    document.dispatchEvent(event);
  }

  public getPlayerPosition() {}

  public isPlayerExists(): boolean {
    return this.playerService.house !== null;
  }
}
