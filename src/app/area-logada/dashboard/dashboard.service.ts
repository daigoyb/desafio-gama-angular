import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';

import { dias, meses } from './dashboard.constants';
import { DashboardCredentials, DashboardResponse } from './dashboard.interfaces';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  dias:string[] = dias
  meses:string[] = meses
  dashboard: DashboardResponse | undefined
  BASE_URL = environment.BASE_URL

  constructor(
    private http: HttpClient,
    private authService: AuthService,

  ) { }
  

  getDashboard(credentials: DashboardCredentials):Observable<DashboardResponse>{
    return this.http.get<DashboardResponse>(this.BASE_URL+'dashboard', {
      headers:{
        'Authorization': this.authService.getToken()!
      },
      params: {
        login: this.authService.getUsuario()!.login,
        inicio: credentials.inicio,
        fim: credentials.fim
      }
    })
  }

  getPlanosConta(credentials: any){
    
  }

  getToday():DashboardCredentials{
    const today = new Date();
    const dd = String(today.getDate()).padStart(2,'0')
    const mm = String(today.getMonth()+1).padStart(2,'0')
    const mm2 = String(today.getMonth()).padStart(2,'0')
    const yyyy = String(today.getFullYear())
    return {
      fim: yyyy + '-' + mm + '-' + dd,
      inicio: yyyy + '-' + mm2 + '-' + dd
    }
  }

  getCompleteDate():string{
    const today = new Date()
    const dayName = dias[today.getDay()]
    const dd = String(today.getDate()).padStart(2,'0')
    const mm = meses[today.getMonth()]
    const yyyy = today.getFullYear()

    return `Hoje é ${dayName}, ${dd} de ${mm} de ${yyyy}`
  }
}
