import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WrapRouterOutletComponent } from './wrap-router-outlet.component';

@NgModule({
  declarations: [WrapRouterOutletComponent],
  imports: [RouterModule],
  exports: [WrapRouterOutletComponent],
})
export class WrapRouterOutletModule {}
