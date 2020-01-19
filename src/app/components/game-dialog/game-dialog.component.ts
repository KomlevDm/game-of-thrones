import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SoundsService } from 'src/app/services/sounds.service';

@Component({
  selector: 'game-dialog',
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.scss']
})
export class GameDialogComponent {
  constructor(public soundsService: SoundsService) {}

  @Input() state$: BehaviorSubject<boolean>;

  public mouseenterButtonMenu(): void {
    this.soundsService.blade.restart();
  }

  public close(): void {
    this.soundsService.past.restart();
    this.state$.next(false);
  }

  public safe() {}
}
