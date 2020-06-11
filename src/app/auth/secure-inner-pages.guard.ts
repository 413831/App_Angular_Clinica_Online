import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecureInnerPagesGuard implements CanActivate {
  authService: any;
  router: any;
  canActivate( next: ActivatedRouteSnapshot,
               state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | 
                                            UrlTree> | boolean | UrlTree 
  {
    if(this.authService.isLoggedIn) 
    {
        window.alert("La sesión está iniciada");
        this.router.navigate(['menu'])
    }
    return true;
  }
}
