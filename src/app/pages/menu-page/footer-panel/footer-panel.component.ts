import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SoundsService } from 'src/app/services/sounds.service';

@Component({
  selector: 'footer-panel',
  templateUrl: './footer-panel.component.html',
  styleUrls: ['./footer-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterPanelComponent {
  constructor(public soundsService: SoundsService) {}
}
