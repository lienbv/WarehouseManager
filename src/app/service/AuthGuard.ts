import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {LoginService} from "./login.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
  userName: string | null = '';
  role: string = '';
  token: string = '';

  constructor(private router: Router,
              private loginService: LoginService) {
  }


  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.userName = this.loginService.getUserName();
    this.role = this.loginService.getRole();
    this.token = this.loginService.getRole();
    if(this.userName === '' && this.role === '' && this.token === ''){
      this.router.navigateByUrl('/login').then();
      return false;
    }
    return true;
  }
}
