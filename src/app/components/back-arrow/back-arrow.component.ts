import { Component, Input } from '@angular/core';
import { SoundsService } from 'src/app/services/sounds.service';

@Component({
  selector: 'back-arrow',
  templateUrl: './back-arrow.component.html',
  styleUrls: ['./back-arrow.component.scss']
})
export class BackArrowComponent {
  constructor(public soundsService: SoundsService) {}

  @Input() navigationUrl = '/';
}
