import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'empty-message',
  templateUrl: './empty-message.component.html',
  styleUrls: ['./empty-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyMessageComponent {
  @Input()
  public text: string;
}
