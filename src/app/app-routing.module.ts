import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopTableComponent } from './components/top-table/top-table.component';
import { HeroSelectionComponent } from './components/hero-selection/hero-selection.component';
import { GameComponent } from './components/game/game.component';
import { LoadComponent } from './components/load/load.component';
import { StartPageComponent } from './pages/start-page/start-page.component';

const routes: Routes = [
  {
    path: '',
    component: StartPageComponent,
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu-page/menu-page.module').then((m) => m.MenuPageModule),
    data: { animation: 'menu-page' },
  },
  {
    path: 'hero-selection',
    component: HeroSelectionComponent,
    data: { animation: 'rest' },
  },
  {
    path: 'game',
    component: GameComponent,
    data: { animation: 'game' },
  },
  {
    path: 'load',
    component: LoadComponent,
    data: { animation: 'rest' },
  },
  {
    path: 'top-table',
    component: TopTableComponent,
    data: { animation: 'rest' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
