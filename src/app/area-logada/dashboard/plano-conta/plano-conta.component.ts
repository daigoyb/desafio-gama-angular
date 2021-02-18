import { Component, OnInit } from '@angular/core';

import { PlanosContaResponse } from '../../../shared/interfaces/plano-conta.interface';
import { PlanoContaService } from '../../../shared/services/plano-conta.service';

@Component({
  selector: 'app-plano-conta',
  templateUrl: './plano-conta.component.html',
  styleUrls: ['./plano-conta.component.scss']
})
export class PlanoContaComponent implements OnInit {

  constructor(
    private planosContaService: PlanoContaService
  ) { }

  planosConta: PlanosContaResponse[] = this.planosContaService.getAllPlanosConta()

  ngOnInit() {
  }





}
