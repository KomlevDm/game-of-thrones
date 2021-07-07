import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateGuard } from './guards/activate.guard';
import { StartPageComponent } from './pages/start-page/start-page.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [ActivateGuard],
    component: StartPageComponent,
  },
  {
    path: '',
    // canLoad: [ActivateGuard],
    // canActivate: [ActivateGuard],
    loadChildren: () => import('./modules/game/game.module').then((m) => m.GameModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
