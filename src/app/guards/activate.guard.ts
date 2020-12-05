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
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class ActivateGuard implements CanLoad, CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  private rootUrl = '/';

  public canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (segments[0].toString() === this.rootUrl && this.userService.isGameActivated) return false;

    if (segments[0].toString() !== this.rootUrl && !this.userService.isGameActivated) {
      this.router.navigate([this.rootUrl]);
      return false;
    }

    return true;
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (state.url === this.rootUrl && this.userService.isGameActivated) return false;

    if (state.url !== this.rootUrl && !this.userService.isGameActivated) {
      this.router.navigate([this.rootUrl]);
      return false;
    }

    return true;
  }
}
