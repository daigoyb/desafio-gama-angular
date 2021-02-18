import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AreaLogadaComponent } from './area-logada/area-logada.component';
import { DashboardComponent } from './area-logada/dashboard/dashboard.component';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { IsLoggedGuard } from './shared/guards/is-logged.guard';
import { NotLoggedGuard } from './shared/guards/not-logged.guard';

const routes: Routes = [{
  path: '',
  component: AreaLogadaComponent,
  canActivate: [IsLoggedGuard],
  children: [{
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }, {
    path: 'dashboard',
    component: DashboardComponent
  }]
},
{
  path: 'home',
  component: HomeComponent,
  canActivate: [NotLoggedGuard]
},
{
  path: 'login',
  component: LoginComponent,
  canActivate: [NotLoggedGuard]
},
{
  path: '**',
  component: Error404Component
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
