import { Component, Input, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SoundsService } from 'src/app/services/sounds.service';

@Component({
  selector: 'back-arrow',
  templateUrl: './back-arrow.component.html',
  styleUrls: ['./back-arrow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackArrowComponent {
  constructor(private router: Router, public soundsService: SoundsService) {}

  @Input()
  public navigationUrl = '/menu';

  @HostListener('document:keydown.escape')
  public onKeydownEscapeHandler() {
    this.soundsService.dragonStompy.restart();
    this.router.navigateByUrl(this.navigationUrl);
  }
}
