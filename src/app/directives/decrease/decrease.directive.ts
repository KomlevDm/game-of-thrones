import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({ selector: '[decrease]' })
export class DecreaseDirective {
  private isDecrease = false;

  @Input()
  private transitionDurationInMs = 200;

  @Output()
  private startedDecrease = new EventEmitter<void>();

  @Output()
  private endedDecrease = new EventEmitter<void>();

  @HostBinding('style.transform')
  private get styleTransform(): string {
    return `scale(${this.isDecrease ? 0 : 1})`;
  }

  @HostBinding('style.transition')
  private get styleTransition(): string {
    return `transform ${this.transitionDurationInMs}ms linear`;
  }

  @HostListener('click')
  private onClick() {
    this.isDecrease = true;
  }

  @HostListener('transitionstart')
  private onTransitionStart() {
    this.startedDecrease.next();
  }

  @HostListener('transitionend')
  private onTransitionEnd() {
    this.endedDecrease.next();
  }
}
