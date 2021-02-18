import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';

import { PlanosContaResponse } from '../interfaces/plano-conta.interface';

@Injectable({
  providedIn: 'root'
})
export class PlanoContaService {

  BASE_URL = environment.BASE_URL

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getPlanosConta():Observable<PlanosContaResponse[]>{
    return this.http.get<PlanosContaResponse[]>(this.BASE_URL+'lancamentos/planos-conta', {
      headers: {
        'Authorization': this.authService.getToken()!
      },
      params: {
        login: this.authService.getUsuario()!.login
      }
    })
  }
  getAllPlanosConta(){
    const planosConta = localStorage.getItem('planosConta')
    return JSON.parse(planosConta!)
  }
  setPlanosConta(){
    if(!this.getAllPlanosConta()){
      this.getPlanosConta()
      .pipe(
        take(1)
      )
      .subscribe(response => {
        console.log(response)
        localStorage.setItem('planosConta', JSON.stringify(response))
      }, error => {
        console.log(error)
      })
    }
  }
}
