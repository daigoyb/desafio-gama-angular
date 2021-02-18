import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AuthService } from '../shared/services/auth.service';
import { LoginCredentials } from './login.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  BASE_URL = environment.BASE_URL

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  logar(credentials: LoginCredentials): Observable<any>{
    return this.http.post<any>(this.BASE_URL+'login', credentials)
    .pipe(
      tap(response => {
        this.authService.setUsuario(response.usuario)
        this.authService.setToken(response.token)
      })
    )
  }
}
