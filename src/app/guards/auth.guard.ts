import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authSvc: AuthService,
    private readonly router: Router
  ) {}

  //TODO: Un guard permite bloquear vista y validar cosas, yo lo utilizo para bloquear, por eso hago injeccion de dependencia al authSvc, que es el que tiene el validarToken y cuando la respuesta es negativa no permita el acceso al Dashboard, tienes que ir al approuting y alli sale el canActivade en el path de dashboard
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.authSvc.validarToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
