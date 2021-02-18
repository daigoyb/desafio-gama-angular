import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { Usuario } from 'src/app/shared/interfaces/usuario.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PlanoContaService } from 'src/app/shared/services/plano-conta.service';

import { PaginasPossiveis } from './dashboard.constants';
import { DashboardCredentials, DashboardResponse } from './dashboard.interfaces';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  usuario: Usuario | undefined
  curday: DashboardCredentials | undefined
  fullDate: string | undefined
  dashboard: DashboardResponse | undefined
  pgsPossiveis: PaginasPossiveis = PaginasPossiveis.Extrato

  isLoading = false
  erro = false
  
  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService,
    private planosContaService: PlanoContaService,
    private router: Router
  ) { }
  
  ngOnInit() {
    this.curday = this.dashboardService.getToday();
    this.usuario = this.authService.getUsuario()
    this.fullDate = this.dashboardService.getCompleteDate();
    this.planosContaService.setPlanosConta();
    this.getDashboard()
  }

  getDashboard(){
    this.erro = false
    this.isLoading = true
    this.dashboardService.getDashboard(this.curday!)
    .pipe(
      take(1),
      finalize(() => this.isLoading=false)
    ).subscribe(
      res => this.onSuccess(res),
      err => this.onError(err)
    )
  }

  clickDeposito(){
    this.pgsPossiveis = PaginasPossiveis.Deposito
  }
  clickTransferencia(){
    this.pgsPossiveis = PaginasPossiveis.Transferencia
  }
  clickPlanosConta(){
    this.pgsPossiveis = PaginasPossiveis.PlanosConta
  }
  clickExtrato(){
    this.pgsPossiveis = PaginasPossiveis.Extrato
  }

  onSuccess(res: DashboardResponse){
    this.dashboard = res
    console.log(res)
  }

  onError(err: HttpErrorResponse){
    console.log(err)
    this.erro = true
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['login'])
  }



}
