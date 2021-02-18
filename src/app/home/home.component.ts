import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';

import { ErrorResponse } from './home.enum';
import { DadosCadastrais } from './home.interfaces';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dadosCadastrais: DadosCadastrais ={
    nome: '',
    login: '',
    senha: '',
    cpf: ''
  }
  senha2: string | undefined
  @ViewChild('nomeInput') nomeInput: ElementRef | undefined;
  @ViewChild('loginInput') loginInput: ElementRef | undefined;
  @ViewChild('cpfInput') cpfInput: ElementRef | undefined;
  @ViewChild('senhaInput') senhaInput: ElementRef | undefined;
  @ViewChild('senha2Input') senha2Input: ElementRef | undefined;

  erro = false
  isLoading = false
  userSuccess = false
  mensagemErro = ''

  constructor(
    private router: Router,
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {
  
  }

  onSubmit(form: NgForm){
    this.erro = false
    if(!form.valid){
      this.validarCamposDoFormulario(form.form)
      this.focarNoPrimeiroInputInvalido(form)
      return
    }
    this.criarUsuario()
  }

  criarUsuario(){
    this.isLoading = true
    this.homeService.criarUsuario(this.dadosCadastrais)
    .pipe(
      take(1),
      finalize(() => this.isLoading = false)
    )
    .subscribe(
      _res => this.onSuccessUser(),
      err => this.onErrorUser(err)
    )
  }

  onSuccessUser(){
    this.userSuccess = true
  }
  onErrorUser(errResp: HttpErrorResponse){
    this.erro = true
    console.log(errResp)

    if(errResp.error.codigo === ErrorResponse.UsuarioJaExiste){
      this.mensagemErro = errResp.error.error
    }
  }


  private validarCamposDoFormulario(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field) as FormControl;
      control.markAsTouched();
    });
  }

  private focarNoPrimeiroInputInvalido(form: NgForm) {
    for (let control of Object.keys(form.controls)) {
      if (form.controls[control].invalid) {
        const input = `${control}Input` as keyof HomeComponent;
        (this[input] as ElementRef).nativeElement.focus();
        break;
      }
    }
  }

  exibeErro(nomeControle: string, form: NgForm) {
    if (!form.controls[nomeControle]) {
      return false;
    }
    return form.controls[nomeControle].invalid && form.controls[nomeControle].touched;
  }

  redirectToLogin(){
    this.router.navigate(['login'])
  }

}
