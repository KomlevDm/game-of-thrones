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
      {
        path: 'hero-selection',
        loadChildren: () =>
          import('../../pages/hero-selection-page/hero-selection-page.module').then((m) => m.HeroSelectionPageModule),
      },
      // {
      //   path: 'game',
      //   component: GameComponent,
      // },
      {
        path: 'load',
        loadChildren: () => import('../../pages/load-page/load-page.module').then((m) => m.LoadPageModule),
      },
      {
        path: 'top-table',
        loadChildren: () =>
          import('../../pages/top-table-page/top-table-page.module').then((m) => m.TopTablePageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
