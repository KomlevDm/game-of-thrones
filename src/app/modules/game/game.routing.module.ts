import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game.component';

const routes: Routes = [
  {
    path: '',
    component: GameComponent,
    children: [
      {
        path: 'menu',
        loadChildren: () => import('../../pages/menu-page/menu-page.module').then((m) => m.MenuPageModule),
      },
      // {
      //   path: 'hero-selection',
      //   component: HeroSelectionComponent,
      //   data: { animation: 'rest' },
      // },
      // {
      //   path: 'game',
      //   component: GameComponent,
      //   data: { animation: 'game' },
      // },
      {
        path: 'load',
        loadChildren: () => import('../../pages/load-page/load-page.module').then((m) => m.LoadPageModule),
      },
      // {
      //   path: 'top-table',
      //   component: TopTableComponent,
      //   data: { animation: 'rest' },
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
