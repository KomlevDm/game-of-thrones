import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'info-state-panel',
  templateUrl: './info-state-panel.component.html',
  styleUrls: ['./info-state-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoStatePanelComponent {
  @Input() public lives = 5;
  @Input() public isShieldActive = true;
  @Input() public isAttackActive = false;
  @Input() public isSuperpowerActive = false;
  @Input() public isTeleportActive = false;

  @Input() public heroName = 'noname';

  @Input() public isRedPotionActive = false;
  @Input() public isGreenPotionActive = false;
  @Input() public isBluePotionActive = false;
  @Input() public score = 0;
}
