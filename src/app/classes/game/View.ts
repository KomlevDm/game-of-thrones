import { ComponentRef, Type } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

export abstract class AView<C> {
  private viewRef: ComponentRef<C>;

  protected view: C;

  protected viewInit(component: Type<C>): void {
    const { gameField, cfr } = GameService.getGameRender();

    this.viewRef = gameField.createComponent(cfr.resolveComponentFactory(component));
    this.view = this.viewRef.instance;
  }

  protected viewDestroy(): void {
    this.viewRef.destroy();
    this.view = null;
  }
}

export interface IView {
  render: () => void;
}
