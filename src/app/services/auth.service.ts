import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ResponseAuth, User } from '../interface/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  constructor(private readonly http: HttpClient) {}

  private _usuario!: User;

  //TODO: Metodo del servicio lo utilizo para luego llamarlo en el dashboar
  get usuario() {
    return { ...this._usuario };
  }

  //TODO: Este servicio, login lo tengo como un observable string ya que la respuesta retorna un string, hice uso de pipe para poder mapear esa respuesta a un string
  login(email: string, password: string): Observable<string> {
    const body = {
      email,
      password,
    };
    return this.http
      .post<ResponseAuth>(this.apiUrl + '/users/login', body)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('token', token);
        }),
        map(({ message }) => {
          return message;
        })
      );
  }

  //TODO: Este servicio, register lo tengo como un observable string ya que la respuesta retorna un string, hice uso de pipe para poder mapear esa respuesta a un string
  register(user: User): Observable<string> {
    return this.http
      .post<ResponseAuth>(this.apiUrl + '/users/register', user)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('token', token);
        }),
        map(({ message }) => {
          return message;
        })
      );
  }

  //TODO: Validar token permite renovar el token de sesion, este lo estoy utilizando en el guard, es un observable boolean porque asi lo decidi yo. Tambien otro dato interesante es que el paylod esta en el token, entonces por eso uso el atob para sacar la parte paylod que es la data del token y como typescrit permite tipar. Entonces tipo la respuesta del atob a una interface user para poder hacer desestruturacion
  validarToken(): Observable<boolean> {
    return this.http.get<ResponseAuth>(this.apiUrl + '/users/renew').pipe(
      map(({ ok, token }) => {
        localStorage.setItem('token', token);
        const { email, lastname, role, name } = JSON.parse(
          atob(token.split('.')[1])
        ) as User;
        this._usuario = {
          email,
          lastname,
          name,
          role,
        };
        return ok;
      }),
      catchError(() => of(false))
    );
  }

  verifyToken(): boolean {
    if (localStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.clear();
  }
}
