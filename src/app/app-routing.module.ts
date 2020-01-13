import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { TopTableComponent } from './components/top-table/top-table.component';
import { HeroSelectionComponent } from './components/hero-selection/hero-selection.component';

const routes: Routes = [
  { path: '', component: MainMenuComponent, data: { animation: 'main-menu' } },
  {
    path: 'hero-selection',
    component: HeroSelectionComponent,
    data: { animation: 'rest' }
  },
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
