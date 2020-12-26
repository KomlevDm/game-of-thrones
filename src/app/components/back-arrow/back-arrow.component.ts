import { Component, Input, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'back-arrow',
  templateUrl: './back-arrow.component.html',
  styleUrls: ['./back-arrow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackArrowComponent {
  constructor(private router: Router, public audioService: AudioService) {}

  @Input()
  public navigationUrl = '/menu';

  @HostListener('document:keydown.escape')
  public onKeydownEscapeHandler() {
    this.audioService.dragonStompy.restart();
    this.router.navigateByUrl(this.navigationUrl);
  }
}
