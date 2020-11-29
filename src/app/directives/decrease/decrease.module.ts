import { NgModule } from '@angular/core';
import { DecreaseDirective } from './decrease.directive';

@NgModule({
  declarations: [DecreaseDirective],
  exports: [DecreaseDirective],
})
export class DecreaseModule {}
