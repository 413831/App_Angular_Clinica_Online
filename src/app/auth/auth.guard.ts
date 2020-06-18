import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificacionComponent } from '../componentes/notificacion/notificacion.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _snackBar: MatSnackBar,public router: Router)
  { }

  canActivate( next: ActivatedRouteSnapshot,
               state: RouterStateSnapshot): Observable<boolean | UrlTree> |  Promise<boolean | UrlTree> |
                                            boolean | UrlTree
  {
    let usuario = localStorage.getItem('usuario');

    if(!usuario) 
    {
      this._snackBar.openFromComponent(NotificacionComponent, {
        duration: 3 * 1000,
        data: "Se modificó el turno exitosamente."
      });
      this.router.navigate(['login'])
    }
    return true;
  }
  
}
