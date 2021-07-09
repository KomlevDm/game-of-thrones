import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartPageComponent {
  constructor(public readonly router: Router, public readonly appStateService: AppStateService) {}
}
