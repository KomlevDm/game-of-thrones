import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route,
  UrlSegment,
  Router,
} from '@angular/router';
import { AppStateService } from '../services/app-state.service';

@Injectable({ providedIn: 'root' })
export class ActivateGuard implements CanLoad, CanActivate {
  constructor(private readonly router: Router, private readonly appStateService: AppStateService) {}

  private readonly ROOT_URL = '/';

  public canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (segments[0].toString() === this.ROOT_URL && this.appStateService.isGameActivated) return false;

    if (segments[0].toString() !== this.ROOT_URL && !this.appStateService.isGameActivated) {
      this.router.navigateByUrl(this.ROOT_URL);
      return false;
    }

    return true;
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (state.url === this.ROOT_URL && this.appStateService.isGameActivated) return false;

    if (state.url !== this.ROOT_URL && !this.appStateService.isGameActivated) {
      this.router.navigateByUrl(this.ROOT_URL);
      return false;
    }

    return true;
  }
}
