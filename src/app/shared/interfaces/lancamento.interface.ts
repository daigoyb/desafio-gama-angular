import { PlanosContaResponse } from './plano-conta.interface';

export interface Lancamento {
    conta: number;
    data: string;
    descricao: string;
    id: number;
    planoConta: PlanosContaResponse;
    tipo: string;
    valor: number;
  }