import { NgModule } from '@angular/core';
import { FireSphereModule } from '../fire-sphere/fire-sphere.module';
import { LogoComponent } from './logo.component';

@NgModule({
  declarations: [LogoComponent],
  imports: [FireSphereModule],
  exports: [LogoComponent],
})
export class LogoModule {}
