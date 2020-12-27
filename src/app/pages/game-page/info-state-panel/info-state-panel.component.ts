import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'info-state-panel',
  templateUrl: './info-state-panel.component.html',
  styleUrls: ['./info-state-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoStatePanelComponent {
  @Input() public lives: number;
  @Input() public isShieldActivated: boolean;
  @Input() public isAttackActivated: boolean;
  @Input() public isSuperpowerActivated: boolean;
  @Input() public isTeleportActivated: boolean;

  @Input() public heroName: string;

  @Input() public isRedPotionActivated: boolean;
  @Input() public isGreenPotionActivated: boolean;
  @Input() public isBluePotionActivated: boolean;
  @Input() public score: number;
}
