import { Conta } from '../shared/interfaces/conta.interface';
import { Usuario } from '../shared/interfaces/usuario.interface';

export interface LoginCredentials{
    usuario:string,
    senha:string
}

export interface LoginResponse {
  conta: Conta;
  contaCredito: Conta;
  dataFim: string;
  dataInicio: string;
  token: string;
  usuario: Usuario;
}

