import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  //TODO: Los interceptos permiten hacer cosas, yo los uso para interceptar peticiones Http y ponerle algo en el header de la peticion. Con esto omito tener que en el servicio pasarle el token. Con el interceptor ya es mas global y para usarlo tenes que mirar en el appmodule, en la parte de provider alli toca injectar HTTP_INTERCEPTOR y luego llamar al interceptor que queremos usar

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    try {
      let req = request;
      req = request.clone({
        setHeaders: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return next.handle(req);
    } catch (error) {
      console.log('😡😡😡😡😡Se rompio😡😡😡😡😡');
    }
    return next.handle(request);
  }
}
