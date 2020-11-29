import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadPageComponent } from './load-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoadPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadPageRoutingModule {}
