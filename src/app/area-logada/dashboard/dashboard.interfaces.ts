import { Lancamento } from '../../shared/interfaces/lancamento.interface';

interface DashboardCredentials{
  inicio: string,
  fim: string
}

interface DashboardResponse {
  contaBanco: Conta;
  contaCredito: Conta;
}

interface Conta {
  id: number;
  lancamentos: Lancamento[];
  saldo: number;
}

export {DashboardResponse, Conta, DashboardCredentials}


