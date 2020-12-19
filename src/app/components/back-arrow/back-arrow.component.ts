import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { SoundsService } from 'src/app/services/sounds.service';

@Component({
  selector: 'back-arrow',
  templateUrl: './back-arrow.component.html',
  styleUrls: ['./back-arrow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackArrowComponent {
  constructor(public soundsService: SoundsService) {}

  @Input()
  public navigationUrl = '/menu';
}
