const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
const dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quita-feira", "Sexta-feira", "Sábado"]

enum PaginasPossiveis{
    Extrato = 'extrato',
    Transferencia = 'transferencia',
    PlanosConta = 'planos-conta',
    Deposito = 'deposito'
}

export {meses, dias, PaginasPossiveis}

