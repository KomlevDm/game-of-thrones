import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopTablePageComponent } from './top-table-page.component';

const routes: Routes = [
  {
    path: '',
    component: TopTablePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopTablePageRoutingModule {}
