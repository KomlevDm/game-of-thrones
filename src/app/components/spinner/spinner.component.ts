import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {}
