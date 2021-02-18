import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePT from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AreaLogadaComponent } from './area-logada/area-logada.component';
import { DashboardComponent } from './area-logada/dashboard/dashboard.component';
import { DepositoComponent } from './area-logada/dashboard/deposito/deposito.component';
import { PlanoContaComponent } from './area-logada/dashboard/plano-conta/plano-conta.component';
import { TransferenciaComponent } from './area-logada/dashboard/transferencia/transferencia.component';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';

registerLocaleData(localePT, 'pt')

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    Error404Component,
    AreaLogadaComponent,
    DashboardComponent,
    PlanoContaComponent,
    TransferenciaComponent,
    DepositoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt'
  }, {
    provide: DEFAULT_CURRENCY_CODE,
    useValue: 'BRL'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
