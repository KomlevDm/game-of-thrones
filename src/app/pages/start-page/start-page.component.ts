import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SoundsService } from '../../services/sounds.service';

@Component({
  selector: 'start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartPageComponent {
  constructor(private router: Router, public soundsService: SoundsService) {}

  public startGame(): void {
    this.router.navigate(['menu']);
  }
}
