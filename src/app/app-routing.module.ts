import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { TopTableComponent } from './components/top-table/top-table.component';

const routes: Routes = [
  { path: '', component: MainMenuComponent, data: { animation: 'main-menu' } },
  {
    path: 'top-table',
    component: TopTableComponent,
    data: { animation: 'rest' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
