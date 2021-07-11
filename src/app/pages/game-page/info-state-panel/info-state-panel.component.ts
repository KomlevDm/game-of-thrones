import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'info-state-panel',
  templateUrl: './info-state-panel.component.html',
  styleUrls: ['./info-state-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoStatePanelComponent {
  @Input() public lives: number;
  @Input() public isShieldAvailable: boolean;
  @Input() public isSuperAttackActivated: boolean;
  @Input() public isSuperpowerAvailable: boolean;
  @Input() public isAttackSpeedActivated: boolean;

  @Input() public heroName: string;

  @Input() public isRedPotionAvailable: boolean;
  @Input() public isGreenPotionAvailable: boolean;
  @Input() public isBluePotionAvailable: boolean;
  @Input() public score: number;
}
