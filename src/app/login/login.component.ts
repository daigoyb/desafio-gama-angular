import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';

import { LoginResponse } from './login.interfaces';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  usuario:string = ''
  senha:string = ''

  isLoading: boolean = false;
  erroNoLogin: boolean = false;

  @ViewChild('usuarioInput') usuarioInput: ElementRef | undefined
  @ViewChild('senhaInput') senhaInput: ElementRef | undefined

  constructor(
    private loginService: LoginService,
    private router: Router
  ){}


  login(){
    this.isLoading = true
    this.erroNoLogin = false
    const creds = {
      usuario: this.usuario,
      senha: this.senha
    }
    this.loginService.logar(creds).pipe(
      take(1),
      finalize(() => this.isLoading=false)
    )
    .subscribe(
      res => this.onSuccessLogin(res),
      error => this.onErrorLogin(error)
    )
  }

  onSuccessLogin(res: LoginResponse){    
    this.router.navigate(['dashboard'])
  }

  onErrorLogin(error: HttpErrorResponse){
    this.erroNoLogin = true;
  }

  onSubmitValidation(form: NgForm){
    if(!form.valid){
      form.controls.usuario.markAsTouched
      form.controls.senha.markAsTouched

      if(form.controls.usuario.invalid){
        this.usuarioInput?.nativeElement.focus()
        return
      }
      if(form.controls.senha.invalid){
        this.senhaInput?.nativeElement.focus()
        return
      }
      return
    }
    this.login()
  }

  exibeErro(nomeControle:string, form: NgForm){
    if(!form.controls[nomeControle]){ 
      return false
    }
    return form.controls[nomeControle].invalid && form.controls[nomeControle].touched
  }

}
