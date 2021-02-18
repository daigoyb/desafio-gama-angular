import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthService } from '../shared/services/auth.service';
import { DadosCadastrais } from './home.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  BASE_URL = environment.BASE_URL

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }
  
  criarUsuario(dadosCadastrais: DadosCadastrais): Observable<null>{
    return this.http.post<null>(this.BASE_URL+'usuarios', dadosCadastrais)
  }

}
