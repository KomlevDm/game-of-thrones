import { Component, ChangeDetectionStrategy, ViewChild, HostBinding, Input } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { transition, trigger, query, style, animate } from '@angular/animations';

@Component({
  selector: 'wrap-router-outlet',
  templateUrl: './wrap-router-outlet.component.html',
  styleUrls: ['./wrap-router-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('routeAnimation', [
      transition('* <=> *', [
        query(':leave', [style({ opacity: 1 }), animate('0.2s', style({ opacity: 0 }))]),
        query(':enter', [style({ opacity: 0 }), animate('0.2s', style({ opacity: 1 }))]),
      ]),
    ]),
  ],
})
export class WrapRouterOutletComponent {
  @Input()
  public isSpinner = false;

  @ViewChild(RouterOutlet, { static: true })
  private routerOutlet: RouterOutlet;

  @HostBinding('@routeAnimation')
  private get routerOutletActivated(): ActivatedRoute {
    return this.routerOutlet.isActivated && this.routerOutlet.activatedRoute;
  }
}
