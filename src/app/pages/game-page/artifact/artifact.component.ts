import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { EArtifactType } from 'src/app/services/artifact.service';

@Component({
  selector: 'artifact',
  templateUrl: './artifact.component.html',
  styleUrls: ['./artifact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtifactComponent {
  public type: EArtifactType;
  public xPositionInPx: number;
  public yPositionInPx: number;

  @HostBinding('style.transform')
  private get transform(): string {
    return `translate(${this.xPositionInPx}px, ${this.yPositionInPx}px)`;
  }
}
