import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpinnerModule } from '../spinner/spinner.module';
import { WrapRouterOutletComponent } from './wrap-router-outlet.component';

@NgModule({
  declarations: [WrapRouterOutletComponent],
  imports: [CommonModule, RouterModule, SpinnerModule],
  exports: [WrapRouterOutletComponent],
})
export class WrapRouterOutletModule {}
