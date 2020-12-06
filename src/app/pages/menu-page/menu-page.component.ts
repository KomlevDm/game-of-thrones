import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SoundsService } from 'src/app/services/sounds.service';
import { BG_IMAGE_LIST } from '../../../assets/img/bg/bg-image-list';

@Component({
  selector: 'menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPageComponent {
  constructor(public soundsService: SoundsService) {}

  @HostBinding('style.backgroundImage')
  private backgroundImage = `url(/assets/img/bg/${this.getRandomBgImage()})`;

  public stateToggleLanguageDialog$ = new BehaviorSubject(false);

  public openToggleLanguageDialog(): void {
    this.soundsService.shortTomahawk.restart();
    this.stateToggleLanguageDialog$.next(true);
  }

  private getRandomBgImage(): string {
    const bgImageNames = Object.values(BG_IMAGE_LIST.menu);
    const randomIndex = Math.round(-0.5 + Math.random() * bgImageNames.length);

    return bgImageNames[randomIndex];
  }
}
