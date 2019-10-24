import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { LoginComponent } from './ui/pages/login/login.component';
import { WebDashboardComponent } from './ui/pages/web-dashboard/web-dashboard.component';
import { WebComponent } from './ui/pages/web/web.component';


const routes: Routes = [{ path: 'login', component: LoginComponent },
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'dashboard', component: WebDashboardComponent, children: [] },
{ path: 'home', component: WebComponent, children: [] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
